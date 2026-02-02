/**
 * SCRIPT PRINCIPAL - Sistema de Gestión de Residentes
 * Funcionalidad para eliminar residentes con confirmación
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configurar botones de eliminar
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const residenteId = this.dataset.id;
            const residenteNombre = this.dataset.nombre;
            
            // Confirmación de eliminación
            if (confirm(`¿Está seguro de eliminar al residente ${residenteNombre}?`)) {
                deleteResidente(residenteId);
            }
        });
    });
});

/**
 * Elimina un residente mediante petición DELETE
 * @param {number} id - ID del residente a eliminar
 */
async function deleteResidente(id) {
    try {
        const response = await fetch(`/residentes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            // Recargar la página para mostrar la lista actualizada
            window.location.reload();
        } else {
            const data = await response.json();
            alert(`Error: ${data.detail || 'No se pudo eliminar el residente'}`);
        }
    } catch (error) {
        console.error('Error al eliminar residente:', error);
        alert('Error de conexión. Por favor, intente nuevamente.');
    }
}
