<?php

namespace Drupal\nkh_resource_center\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements Resource Center Node form.
 */
class SingleResource extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'nkh_resource_center_single';
  }

  /**
   * {@inheritdoc}
   *
   * @todo Add add exeception if no $entity_id
   */
  public function buildForm(array $form, FormStateInterface $form_state, $entity_id = NULL) {
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
    $storage = \Drupal::entityTypeManager()->getStorage('node');
    $node = $storage->load($entity_id);
    $build = $view_builder->view($node, 'nkh_resource_center');
    $file_type = NULL;
    if ($node->get('field_upload')->entity !== NULL) {
      $file_uri = $node->get('field_upload')->entity->getFileUri();
      $fid = $node->get('field_upload')->entity->id();
    }
    if ($node->get('field_image_featured')->entity !== NULL) {
      $mid = $node->get('field_image_featured')->entity->id();
    }
    if ($node->get('field_file_type')->entity !== NULL) {
      $file_type = $node->get('field_file_type')->entity->getName();
    }

    $field_count = $form_state->get('field_deltas');

    $form['#cache'] = ['max-age' => 0];
    $form['#tree'] = TRUE;

    $form_state->set('zip_url', '');
    $form_state->set('resource_list_state', 'closed');
    $form_state->set('session_name', 'nkh_bulk_download');
    $form_state->set('fid', $fid);
    $form_state->set('file_uri', $file_uri);
    $form_state->set('field_deltas', \Drupal::request()->getSession()->get('nkh_bulk_download'));

    $form['form_header'] = [
      '#type' => 'container',
      '#prefix' => '<div id="resource_center_header">',
      '#suffix' => '</div>',
    ];

    // Build the media thumbnail if present.
    if (!empty($mid)) {
      $media_builder = \Drupal::entityTypeManager()->getViewBuilder('media');
      $media_storage = \Drupal::entityTypeManager()->getStorage('media');
      $media_entity = $media_storage->load($mid);
      $media_build = $media_builder->view($media_entity, 'small_featured_image');
      $form['form_header']['image_featured'] = [
        '#type' => 'item',
        '#markup' => render($media_build),
      ];
    }

    $form['form_header']['form_title'] = [
      '#type' => 'container',
      '#prefix' => '<div id="resource_center_title">',
      '#suffix' => '</div>',
    ];
    $form['form_header']['form_title']['resource_type'] = [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => $file_type,
    ];
    $form['form_header']['form_title']['node_title'] = [
      '#type' => 'page_title',
      '#title' => $node->getTitle(),
    ];

    $form['form_header']['form_actions'] = [
      '#type' => 'container',
      '#prefix' => '<div id="resource_center_actions">',
      '#suffix' => '</div>',
    ];

    $form['form_header']['form_actions']['download_single'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('Download Resource'),
      '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterSingleDownload("' . file_create_url($file_uri) . '")'],
    ];

    $form['form_header']['form_actions']['copy_single'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('Copy to Clipboard'),
      '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterCopy(' . $entity_id . ')'],
    ];

    $form['form_header']['form_actions']['add_resource'] = [
      '#type' => 'submit',
      '#value' => t('Add to Bulk Download'),
      '#submit' => ['Drupal\nkh_resource_center\Form\NKHResourceCenter::addResource'],
      '#ajax' => [
        'callback' => '::addResourceCallback',
        'wrapper' => 'ajax_resource_container',
      ],
    ];

    $form['form_header']['form_actions']['file_url'] = [
      '#type' => 'textfield',
      '#value' => file_create_url($file_uri),
      '#attributes' => [
        'id' => 'resource_center_file_' . $entity_id,
        'readonly' => 'readonly',
      ],
    ];

    $form['page_content'] = [
      '#type' => 'item',
      '#markup' => render($build),
    ];

    $form['resource_container'] = [
      '#type' => 'container',
      '#prefix' => '<div id="ajax_resource_container">',
      '#suffix' => '</div>',
    ];

    $form['resource_container']['item_count'] = [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => t(count(\Drupal::request()->getSession()->get('nkh_bulk_download')) . ' Items to Download'),
      '#attributes' => [
        'class' => 'resource-item-count',
      ],
    ];
    if (count(\Drupal::request()->getSession()->get('nkh_bulk_download')) > 0) {
      $form['resource_container']['download_zip'] = [
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

    $form['resource_container']['zip_link'] = [
      '#type' => 'textfield',
      '#value' => $form_state->get('zip_url'),
      '#attributes' => [
        'id' => 'resource_zip_link',
        'readonly' => 'readonly',
      ],
    ];

    $form['resource_container']['collapse'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('Collapse Items'),
      '#attributes' => [
        'onclick' => 'Drupal.behaviors.nkhCollapseItems()',
        'id' => 'resource_collapse_button',
      ],
    ];
    $form['resource_container']['resource_list'] = [
      '#type' => 'container',
      '#prefix' => '<div id="nkh_resource_list" class="' . $form_state->get('resource_list_state') . '">',
      '#suffix' => '</div>',
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

        $form['resource_container']['resource_list'][$value[0]]['resource_display'] = [
          '#type' => 'html_tag',
          '#tag' => 'a',
          '#value' => file_create_url($value[1]),
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
        ];
      }
    }

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
  public function zipResourcesCallback(array &$form, FormStateInterface $form_state) {
    $form['resource_container']['zip_link'] = [
      '#type' => 'textfield',
      '#value' => $form_state->get('zip_url'),
      '#attributes' => [
        'id' => 'resource_zip_link',
        'readonly' => 'readonly',
      ],
    ];
    return $form['resource_container']['zip_link'];
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
