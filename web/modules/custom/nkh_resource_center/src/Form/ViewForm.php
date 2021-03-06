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
class ViewForm extends FormBase {
  protected $formNid;

  /**
   * {@inheritdoc}
   */
  public function __construct($formNid) {
    $this->formNid = $formNid;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'nkh_resource_view_form-' . $this->formNid;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $entity_id = NULL, $entity_path = NULL, $file_id = NULL, $file_uri = NULL) {
    $host = $this->getRequest()->getSchemeAndHttpHost();
    $form_state->set('session_name', 'nkh_bulk_download');
    $form_state->set('nid', $entity_id);
    $form['#cache'] = ['max-age' => 0];

    $form['resource']['resource_item'][$entity_id] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['resource-container-inline'],
      ],
      '#tree' => TRUE,
    ];

    $form['resource']['resource_item'][$entity_id]['form_actions'] = [
      '#type' => 'container',
      '#prefix' => '<div id="resource_center_actions">',
      '#suffix' => '</div>',
    ];

    $form['resource']['resource_item'][$entity_id]['form_actions']['download_single'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('Download Resource'),
      '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterSingleDownload(event,"/resource-center/' . $file_id . '/download")'],
    ];

    $form['resource']['resource_item'][$entity_id]['form_actions']['add_resource'] = [
      '#type' => 'submit',
      '#value' => t('Add to Bulk Download'),
      '#submit' => ['Drupal\nkh_resource_center\Form\NKHResourceCenter::addResource'],
      '#ajax' => [
        'callback' => '::addResourceCallback',
        'wrapper' => 'block-sessionblock',
      ],
      '#name' => $file_id,
      '#prefix' => '<span class="resource-input-button">',
      '#suffix' => '</span>',
    ];

    $form['resource']['resource_item'][$entity_id]['form_actions']['copy_single'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => t('Copy a Shareable Link'),
      '#attributes' => ['onclick' => 'Drupal.behaviors.nkhResourceCenterCopy(event, ' . $entity_id . ')'],
    ];

    $form['resource']['resource_item'][$entity_id]['form_actions']['file_url'] = [
      '#type' => 'textfield',
      '#value' => $host . $entity_path,
      '#attributes' => [
        'id' => 'resource_center_file_' . $entity_id,
        'readonly' => 'readonly',
      ],
    ];
    $form['#attached']['library'][] = 'nkh_resource_center/single_form';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function addResourceCallback(array &$form, FormStateInterface $form_state) {
    $ajax_response = new AjaxResponse();
    $ajax_response->addCommand(new InvokeCommand(NULL, 'nkhResourceRebuild', [render(\Drupal::formBuilder()->getForm('Drupal\nkh_resource_center\Form\DownloadForm'))]));
    return $ajax_response;
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
