<?php

namespace Drupal\nkh_resource_center\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Session' Block.
 *
 * @Block(
 *   id = "session_block",
 *   admin_label = @Translation("Session block"),
 *   category = @Translation("Session Test"),
 * )
 */
class SessionBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $form = \Drupal::formBuilder()->getForm('Drupal\nkh_resource_center\Form\DownloadForm');
    $build['#markup'] = render($form);
    $build['#cache']['max-age'] = 0;
    return $build;
  }

}
