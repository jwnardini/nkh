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
class DownloadForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'nkh_resource_download_form';
  }

  /**
   * {@inheritdoc}
   *
   * @todo Add add exeception if no $entity_id
   */
  public function buildForm(array $form, FormStateInterface $form_state, $entity_id = NULL, $entity_path = NULL, $file_id = NULL, $file_uri = NULL) {
    $field_count = $form_state->get('field_deltas');
    $form_state->set('zip_url', '');
    $form_state->set('session_name', 'nkh_bulk_download');
    $form['#cache'] = ['max-age' => 0];
    $form['#tree'] = TRUE;

    // Start the Resource Container.
    $form['resource_container'] = [
      '#type' => 'container',
      '#prefix' => '<div id="ajax_resource_container">',
      '#suffix' => '</div>',
    ];

    $form['resource_container']['rebuild_container'] = [
      '#type' => 'container',
      '#prefix' => '<div class="element-invisible">',
      '#suffix' => '</div>',
    ];

    $form['resource_container']['rebuild_container']['rebuild'] = [
      '#type' => 'submit',
      '#value' => t('Rebuild'),
      '#ajax' => [
        'event' => 'click',
        'callback' => '::rebuildCallback',
        'wrapper' => 'ajax_resource_container',
      ],
      '#attributes' => [
        'name' => 'edit-resource-container-rebuild',
      ],
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
          'wrapper' => 'nkh_resource_list',
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
    return $form;
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
  public function removeResourceCallback(array &$form, FormStateInterface $form_state) {
    return $form['resource_container'];
  }

  /**
   * {@inheritdoc}
   */
  public function rebuildCallback(array &$form, FormStateInterface $form_state) {
    return $form['resource_container'];
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
