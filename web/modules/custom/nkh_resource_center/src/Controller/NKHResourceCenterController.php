<?php

namespace Drupal\nkh_resource_center\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * An example controller.
 */
class NKHResourceCenterController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function listing() {
    $build = array(
      '#type' => 'markup',
      '#markup' => t('Hello World!'),
    );
    return $build;
  }

}
