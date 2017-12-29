<?php

namespace Drupal\nkh_resource_center\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Drupal\nkh_resource_center\Form\NKHResourceCenter;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\taxonomy\Entity\Term;

/**
 * Implements Resource Center Node form.
 */
class ResourceListing extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'nkh_resource_center_listing';
  }

  /**
   * {@inheritdoc}
   *
   * @todo Add add exeception if no $entity_id
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $host = $this->getRequest()->getSchemeAndHttpHost();
    $view_id = 'resource_view';
    $view = NKHResourceCenter::getViewData($view_id);
    // Return 404 if there is no view.
    if ($view == NULL) {
      throw new NotFoundHttpException();
    }

    $field_count = $form_state->get('field_deltas');
    $form_state->set('zip_url', '');
    $form_state->set('session_name', 'nkh_bulk_download');
    $form['#cache'] = ['max-age' => 0];
    $form['#tree'] = TRUE;

    // Build the query results to show at the top of the form.
    $query_results_data = $view[1]->getExposedInput();
    $query_string = '<span class="query-filter__label">Showing: </span>';
    $query_results = '';
    foreach ($query_results_data as $key => $result) {
      if ($key == 'title' && $result != '') {
        $query_results .= '"' . $result . '", ';
      }
      elseif (is_numeric($result)) {
        $term = Term::load($result);
        $name = $term->getName();
        $query_results .= $name . ', ';
      }
    }

    if ($query_results_data == NULL) {
      $query_results .= 'All Resources (A-Z) ';
    }
    $query_string .= '<span class="query-filter__results">' . rtrim($query_results, ', ') . '</span>';

    $form['query'] = [
      '#type' => 'item',
      '#markup' => $query_string,
    ];

    $form['resource'] = [
      '#type' => 'container',
      '#prefix' => '<div id="nkh_resource_view_listing">',
      '#suffix' => '</div>',
    ];

    $form_state->set('view_listing', TRUE);
    foreach ($view[0] as $key => $row) {
      $current_row = $this->buildResource($row);
      $form['resource']['resource_item'][$row] = [
        '#type' => 'container',
        '#attributes' => [
          'class' => ['resource-container-inline'],
        ],
        '#tree' => TRUE,
      ];

      $form['resource']['resource_item'][$row]['resource'] = [
        '#type' => 'item',
        '#markup' => render($current_row['node_view']),
      ];

      $form['resource']['resource_item'][$row]['form_actions'] = [
        '#type' => 'container',
        '#prefix' => '<div id="resource_center_actions">',
        '#suffix' => '</div>',
      ];

      if ($current_row['file_type_id'] != 96) {
        $form['resource']['resource_item'][$row]['form_actions']['download_single'] = [
          '#type' => 'html_tag',
          '#tag' => 'button',
          '#value' => t('Download Resource'),
          '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterSingleDownload(event,"' . file_create_url($current_row[1]) . '")'],
        ];

        $form['resource']['resource_item'][$row]['form_actions']['add_resource'] = [
          '#type' => 'submit',
          '#value' => t('Add to Bulk Download'),
          '#submit' => ['Drupal\nkh_resource_center\Form\NKHResourceCenter::addResource'],
          '#ajax' => [
            'callback' => '::addResourceCallback',
            'wrapper' => 'ajax_resource_container',
          ],
          '#name' => $current_row['upload_id'],
        ];
      }

      $form['resource']['resource_item'][$row]['form_actions']['copy_single'] = [
        '#type' => 'html_tag',
        '#tag' => 'button',
        '#value' => t('Copy a Shareable Link'),
        '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterCopy(event, ' . $row . ')'],
      ];

      $form['resource']['resource_item'][$row]['form_actions']['file_url'] = [
        '#type' => 'textfield',
        '#value' => $host . $current_row['node_url'],
        '#attributes' => [
          'id' => 'resource_center_file_' . $row,
          'readonly' => 'readonly',
        ],
      ];
    }

    // Start the Resource Container.
    $form['resource_container'] = [
      '#type' => 'container',
      '#prefix' => '<div id="ajax_resource_container">',
      '#suffix' => '</div>',
    ];

    $form['resource_container']['option'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['nkh_resource_container_options'],
      ],
    ];
    $download_text = count(\Drupal::request()->getSession()->get('nkh_bulk_download')) . ' ' . t('Items to Download');
    if (count(\Drupal::request()->getSession()->get('nkh_bulk_download')) == 1) {
      $download_text = count(\Drupal::request()->getSession()->get('nkh_bulk_download')) . ' ' . t('Item to Download');
    }

    $form['resource_container']['option']['item_count'] = [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => $download_text,
      '#attributes' => [
        'class' => 'resource-item-count',
      ],
    ];

    if (count(\Drupal::request()->getSession()->get('nkh_bulk_download')) > 0) {
      $form['resource_container']['option']['download_zip'] = [
        '#type' => 'submit',
        '#value' => t('Download All Items'),
        '#submit' => ['Drupal\nkh_resource_center\Form\NKHResourceCenter::zipResources'],
        '#ajax' => [
          'callback' => '::zipResourcesCallback',
          'wrapper' => 'resource_zip_link',
        ],
        '#attributes' => [
          'class' => ['button'],
        ],
      ];
    }

    $form['resource_container']['option']['collapse'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('View All Items'),
      '#attributes' => [
        'id' => 'nkh_toggle_resource_container',
      ],
    ];

    $form['resource_container']['resource_list'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'nkh_resource_list',
        'class' => 'closed',
      ],
    ];

    if (\Drupal::request()->getSession()->get('nkh_bulk_download')) {
      foreach (\Drupal::request()->getSession()->get('nkh_bulk_download') as $key => $value) {
        $form['resource_container']['resource_list'][$value[0]] = [
          '#type' => 'container',
          '#attributes' => [
            'class' => ['container-inline'],
          ],
          '#tree' => TRUE,
        ];

        $form['resource_container']['resource_list'][$value[0]]['resource_type'] = [
          '#type' => 'html_tag',
          '#tag' => 'span',
          '#value' => $value[3],
          '#attributes' => [
            'class' => 'resource_file_type',
          ],
        ];

        $form['resource_container']['resource_list'][$value[0]]['resource_display'] = [
          '#type' => 'html_tag',
          '#tag' => 'a',
          '#value' => urldecode($value[2]),
          '#attributes' => [
            'href' => file_create_url($value[1]),
          ],
        ];

        $form['resource_container']['resource_list'][$value[0]]['remove_resource'] = [
          '#type' => 'submit',
          '#value' => t('Remove'),
          '#submit' => ['Drupal\nkh_resource_center\Form\NKHResourceCenter::removeResource'],
          '#ajax' => [
            'callback' => '::removeResourceCallback',
            'wrapper' => 'ajax_resource_container',
          ],
          '#attributes' => [
            'class' => ['button-small'],
          ],
          '#name' => 'remove_name_' . $value[0],
          '#prefix' => '<div class="remove-resource__wrapper">',
          '#suffix' => '</div>',
        ];
      }
    }

    $form['pager'] = [
      '#type' => 'pager',
    ];

    $form['#attached']['library'][] = 'nkh_resource_center/single_form';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function addResourceCallback(array &$form, FormStateInterface $form_state) {
    return $form['resource_container'];
  }

  /**
   * {@inheritdoc}
   */
  public function removeResourceCallback(array &$form, FormStateInterface $form_state) {
    return $form['resource_container'];
  }

  /**
   * {@inheritdoc}
   */
  private function buildResource($nid) {
    $build = [];
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
    $storage = \Drupal::entityTypeManager()->getStorage('node');
    $node = $storage->load($nid);
    $build['node_view'] = $view_builder->view($node, 'teaser');
    $build['node_url'] = $node->url();
    if ($node->get('field_upload')->entity !== NULL) {
      $build['upload_uri'] = $node->get('field_upload')->entity->getFileUri();
      $build['upload_id'] = $node->get('field_upload')->entity->id();
    }

    if ($node->get('field_file_type')->entity !== NULL) {
      $build['file_type_id'] = $node->get('field_file_type')->entity->id();
    }

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function resourceToggleCallback(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    $response->addCommand(new InvokeCommand(NULL, 'toggleResourceContainer', [$form_state->get('container_status')]));
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function zipResourcesCallback(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    $response->addCommand(new InvokeCommand(NULL, 'downloadZip', [$form_state->get('zip_url')]));
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}
