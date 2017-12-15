<?php

namespace Drupal\nkh_resource_center\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Views;

/**
 * {@inheritdoc}
 */
abstract class NKHResourceCenter extends FormBase {

  /**
   * {@inheritdoc}
   */
  public static function addResource(array &$form, FormStateInterface $form_state) {
    \Drupal::logger('my_module')->notice('addResource');
    $session = \Drupal::request()->getSession();
    $session_name = $form_state->get('session_name');
    $current_session = $session->get($session_name);
    $is_duplicate = FALSE;
    $fid = '';
    $nid = '';
    $file = [];

    // Set nid based on which form is making the call.
    if ($form_state->get('nid') !== NULL) {
      $nid = $form_state->get('nid');
    }
    else {
      $nid = $form_state->getTriggeringElement()['#parents'][2];
    }

    // Get fid and set session variables.
    $storage = \Drupal::entityTypeManager()->getStorage('node');
    $node = $storage->load($nid);

    if ($node->get('field_upload')->entity !== NULL) {
      $fid = $node->get('field_upload')->entity->id();
      $file_uri = $node->get('field_upload')->entity->getFileUri();
      $file_name = explode('/', $file_uri);
      $file[] = $node->get('field_upload')->entity->id();
      $file[] = $file_uri;
      $file[] = $file_name[3];
      $file[] = $node->get('field_file_type')->entity->getName();
    }
    else {
      return FALSE;
    }

    if ($session && $file != NULL) {
      foreach ($current_session as $parent) {
        if ($parent[0] == $fid) {
          $is_duplicate = TRUE;
        }
      }
      if ($is_duplicate == FALSE) {
        $current_session[] = $file;
        $session->set($session_name, $current_session);
        $current_session = $session->get($session_name);
      }
      $field_deltas_array = $form_state->get('field_deltas');
      $field_deltas_array = $current_session;
      $form_state->set('field_deltas', $field_deltas_array);
      $form_state->setRebuild();
      drupal_get_messages();
    }

  }

  /**
   * {@inheritdoc}
   */
  public static function removeResource(array &$form, FormStateInterface $form_state) {
    \Drupal::logger('my_module')->notice('RemoveResource');
    $session = \Drupal::request()->getSession();
    $session_name = $form_state->get('session_name');
    $current_session = $session->get($session_name);
    $fid = $form_state->getTriggeringElement()['#parents'][2];
    foreach ($current_session as $parent) {
      if (($pos = array_search($fid, $parent)) !== FALSE) {
        unset($current_session[$pos]);
      }
    }

    $current_session = array_values($current_session);
    $session->set($session_name, $current_session);
    $delta_remove = $fid;
    $field_deltas_array = $form_state->get('field_deltas');
    $key_to_remove = array_search($delta_remove, $field_deltas_array);
    unset($field_deltas_array[$key_to_remove]);
    $form_state->set('field_deltas', $field_deltas_array);
    $form_state->setRebuild();
    drupal_get_messages();
  }

  /**
   * {@inheritdoc}
   */
  public static function zipResources(array &$form, FormStateInterface $form_state) {
    $session = \Drupal::request()->getSession();
    $session_name = $form_state->get('session_name');
    $current_session = $session->get($session_name);

    $zip = new \ZipArchive();
    $zip_name = 'NKH_Resources_' . date('U', strtotime('now')) . ".zip";
    $destination = \Drupal::service('file_system')->realpath('public://resource_zips');

    foreach ($current_session as $value) {
      $storage = \Drupal::entityTypeManager()->getStorage('file');
      $file = $storage->load($value[0]);
      $filename = $file->getFilename();
      $fileUri = \Drupal::service('file_system')->realpath($file->getFileUri());
      $zip->open($destination . "/" . $zip_name, constant("ZipArchive::CREATE"));
      $zip->addFile($fileUri, $filename);
    }
    $zip->close();
    $form_state->set('resource_list_state', 'closed');
    $form_state->set('zip_url', file_create_url('public://resource_zips/' . $zip_name));
    drupal_get_messages();
  }

  /**
   * {@inheritdoc}
   */
  public static function getViewData($name) {
    $view = Views::getView($name);
    $result = [];
    $args = [];
    if (is_object($view)) {
      $view->setDisplay('resource_center_block_display');
      $view->setArguments($args);
      $view->preExecute();
      $view->execute();
      $view->render();
    }

    foreach ($view->result as $row) {
      $result[] = $row->nid;
    }
    $whole_view = [$result, $view];
    return $whole_view;
  }

}
