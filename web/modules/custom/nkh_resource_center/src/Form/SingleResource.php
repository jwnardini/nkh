<?php

namespace Drupal\nkh_resource_center\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\InvokeCommand;

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
    $host = $this->getRequest()->getSchemeAndHttpHost();
    $path = $node->url();
    $build = $view_builder->view($node, 'nkh_resource_center');
    $file_type = NULL;
    $is_video = isset($node->get('field_video')->entity);
    if ($node->get('field_upload')->entity !== NULL) {
      $file_uri = $node->get('field_upload')->entity->getFileUri();
      $fid = $node->get('field_upload')->entity->id();
    }

    if ($node->get('field_file_type')->entity !== NULL) {
      $type_count = $node->get('field_file_type')->count();
      for ($i = 0; $i < $type_count; $i++) {
        $file_type[] = $node->get('field_file_type')->get($i)->entity->getName();
      }
    }

    $field_count = $form_state->get('field_deltas');

    $form['#cache'] = ['max-age' => 0];
    $form['#tree'] = TRUE;

    $form_state->set('zip_url', '');
    $form_state->set('container_status', 'closed');
    $form_state->set('session_name', 'nkh_bulk_download');
    $form_state->set('fid', $fid);
    $form_state->set('nid', $entity_id);
    $form_state->set('file_uri', $file_uri);
    $form_state->set('field_deltas', \Drupal::request()->getSession()->get('nkh_bulk_download'));
    $form['form_header'] = [
      '#type' => 'container',
      '#prefix' => '<div id="resource_center_header">',
      '#suffix' => '</div>',
    ];

    // Build the media thumbnail if present or the video embed.
    if ($node->get('field_image_featured')->entity !== NULL || $node->get('field_video')->entity !== NULL) {
      if ($is_video) {
        $mid = $node->get('field_video')->entity->id();
      }
      else {
        $mid = $node->get('field_image_featured')->entity->id();
      }
      if (!empty($mid)) {
        $media_builder = \Drupal::entityTypeManager()->getViewBuilder('media');
        $media_storage = \Drupal::entityTypeManager()->getStorage('media');
        $media_entity = $media_storage->load($mid);
        $media_build = $media_builder->view($media_entity, 'embed');

        $form['form_header']['image_featured'] = [
          '#type' => 'item',
          '#markup' => render($media_build),
        ];
      }
    }

    $form['form_header']['form_title'] = [
      '#type' => 'container',
      '#prefix' => '<div id="resource_center_title">',
      '#suffix' => '</div>',
    ];
    $form['form_header']['form_title']['resource_type'] = [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => implode(' ', $file_type),
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

    if (!$is_video) {
      $form['form_header']['form_actions']['download_single'] = [
        '#type' => 'html_tag',
        '#tag' => 'button',
        '#value' => t('Download Resource'),
        '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterSingleDownload(event,"/resource-center/' . $form_state->get('fid') . '/download")'],
      ];

      $form['form_header']['form_actions']['add_resource'] = [
        '#type' => 'submit',
        '#value' => t('Add to Bulk Download'),
        '#submit' => ['Drupal\nkh_resource_center\Form\NKHResourceCenter::addResource'],
        '#ajax' => [
          'callback' => '::addResourceCallback',
          'wrapper' => 'ajax_resource_container',
        ],
        '#name' => $entity_id,
        '#prefix' => '<span class="resource-input-button">',
        '#suffix' => '</span>',
      ];
    }

    $form['form_header']['form_actions']['copy_single'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('Copy a Shareable Link'),
      '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterCopy(event, ' . $entity_id . ')'],
    ];

    $form['form_header']['form_actions']['file_url'] = [
      '#type' => 'textfield',
      '#value' => $host . $path,
      '#attributes' => [
        'id' => 'resource_center_file_' . $entity_id,
        'readonly' => 'readonly',
      ],
    ];

    $form['page_content'] = [
      '#type' => 'item',
      '#markup' => render($build),
    ];

    $form['#attached']['library'][] = 'nkh_resource_center/single_form';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function addResourceCallback(array &$form, FormStateInterface $form_state) {
    return \Drupal::formBuilder()->getForm('Drupal\nkh_resource_center\Form\DownloadForm');
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
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}
