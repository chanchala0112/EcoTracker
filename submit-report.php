<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $desc = $_POST["description"];
  $location = $_POST["location"];
  $photoName = $_FILES["photo"]["name"];
  $photoTmp = $_FILES["photo"]["tmp_name"];
  $uploadDir = "uploads/";

  if (!file_exists($uploadDir)) {
    mkdir($uploadDir);
  }

  move_uploaded_file($photoTmp, $uploadDir . $photoName);

  // Save to database (optional)
  echo "Report submitted successfully!";
}
?>
