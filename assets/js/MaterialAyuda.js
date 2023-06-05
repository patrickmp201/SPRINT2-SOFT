$(document).ready(function() {
    $("#form-agregar-material").submit(function(event) {
      event.preventDefault(); // Prevenir que el formulario se envíe automáticamente
      GuardarMaterial(); // Llamar a la función "save_Edicion()"
  
  
    });
  });


function GuardarMaterial() {
    var url;
    var idUsuario = $('#txt_usuario').text().trim();
    console.log(idUsuario);
    
    url = "MaterialAyudaController/GuardarMaterial/" + idUsuario;
  
    $.ajax({
      url: url,
      type: "POST",
      data: $('#form-agregar-material').serialize(),
      dataType: "JSON",
      success: function(data) {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Datos guardados correctamente'
          }).then(function() {
            location.reload();
          });
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar el registro'
        });
      }
    });
  }

  
  
  $(document).ready(function() {
    // Función para obtener el valor del ID de usuario y realizar la solicitud AJAX
    function MostrarMaterial() {
      // Obtener el valor del ID de usuario del elemento con id "txt_dni"
      var idUsuario = $('#txt_usuario').text().trim();
      console.log(idUsuario);
  
      $.ajax({
        type: 'POST',
        url: 'MaterialAyudaController/MostrarMaterial/' + idUsuario,
        async: true,
        dataType: 'json',
        // data: { idUsuario: idUsuario }, // Enviar el ID de usuario en los datos de la solicitud
        success: function(data) {
          let html = '';
          let i;
  
          for (i = 0; i < data.length; i++) {
            html +=
              '<tr>' +
              '<td style="text-align: center;">' + data[i].IdMaterialAyuda + '</td>' +
              '<td style="text-align: center;">' + data[i].Comentarios + '</a></td>' +
              '<td style="text-align: center;">' + data[i].IdUsuarioDNI + '</td>' +
              '<td style="text-align: center;"><button type="button" data-toggle="tooltip" data-original-title="like" class="btn btn-outline-success rounded-pill waves-effect waves-light" onclick="like(' + data[i].IdMaterialAyuda + ')"><i class="mdi mdi-hand-heart" aria-hidden="true"></i></button><button type="button" data-toggle="tooltip" data-original-title="Eliminar" class="btn btn-outline-danger rounded-pill waves-effect waves-light" onclick="eliminar(' + data[i].IdMaterialAyuda + ')"><i class="ti-trash" aria-hidden="true"></i></button></td>' +

              '</tr>';
          }
  
          $('#curso-tabla').html(html);
  
          $("#tablaCurso").DataTable({
            language: {
              paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
              }
            },
            drawCallback: function() {
              $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
            }
          });
        }
      });
    }
  
    // Llamar a la función Cursoinscritos al cargar la página
    MostrarMaterial();
  });
  
  function like() {
    Swal.fire({
      title: 'Me gusta tu sugerencia',
      text: '¡Has recibido un like en tu logro!',
      icon: 'success'
    });
  }


  


  function eliminar(IdMaterialAyuda) {
    event.preventDefault();
    
    var url = 'MaterialAyudaController/BorrarCurso/' + IdMaterialAyuda;
  console.log(IdMaterialAyuda);
  
    Swal.fire({
      title: "¿Está seguro?",
      text: "No podrá recuperar el registro una vez sea eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: "No, Cancelar!",
      confirmButtonClass: "btn-danger",
      closeOnConfirm: true,
      closeOnCancel: true
    }).then(function(result) {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "El registro ha sido eliminado!",
          icon: "success"
        }).then(function() {
          window.location.replace(url);
        });
      } else {
        Swal.fire("Cancelado", "El registro está a salvo! :)", "error");
      }
    });
  }
  
  