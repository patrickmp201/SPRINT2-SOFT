<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginModal extends CI_Model {
    public function ValidarUsuario($DNI, $password)
    {
        $sql = "SELECT * FROM registro WHERE DNI =  '$DNI'  AND password = '$password';";
        $query = $this->db->query($sql, array($DNI, $password));
        return $query->row(); // Utilizar row() en lugar de result()
    }
    
    
    
    
}
