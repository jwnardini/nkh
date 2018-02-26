<?php

namespace Drupal\nkh_resource_center\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * {@inheritdoc}
 */
class DownloadController extends ControllerBase {

  /**
   * Returns the file with new headers to automatically download.
   */
  public function downloadFile($fid) {
    $storage = \Drupal::entityTypeManager()->getStorage('file');
    $file = $storage->load($fid);
    if ($file == NULL) {
      throw new NotFoundHttpException();
    }
    // Create a new Response.
    $download = new Response();
    $filename = $file->getFilename();
    $mimetype = $file->getMimeType();
    $download->setContent(file_get_contents($file->getFileUri()));
    $download->headers->set('Content-Type', $mimetype);
    $download->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');
    $download->headers->set('Content-Length', $file->getSize());
    return $download;
  }

}
