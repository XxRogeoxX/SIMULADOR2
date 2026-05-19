let clientes = [ 
  {cedula:"0952934782", nombre:"Ronald", apellido:"Sanchez", ingresos:1000, egresos:800, email:"jjjQgmail", telefono:"0554655154"},
  {cedula:"0952934582", nombre:"Ron", apellido:"Sancho", ingresos:100, egresos:80, email:"jjjQgmail", telefono:"0554655154"},
  {cedula:"0952934482", nombre:"Rafaela", apellido:"Sanche", ingresos:1200, egresos:800, email:"jjjQgmail", telefono:"0554655154"}
];
  let creditos = [];
 
  let tasaInteres = 15;
  let montoMaximo = 20000;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  let listaContactos = [
    { nombre: "Ana", numero: "0952934895" },
    { nombre: "Jorge", numero: "0985941507" },
    { nombre: "Rafa", numero: "0916551542" }];
 
 
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
 
function ocultarSecciones(){
  // arreglo con los IDs de TODAS secciones de forma limpia
  let secciones = ["clientes", "parametros", "credito", "listaCreditos", "contactos", "creditosVip"];
  
  for(let i = 0; i < secciones.length; i++) {
    let seccion = document.getElementById(secciones[i]);
    if(seccion) {
      seccion.classList.remove("activa");
    }
  }
}

function mostrarSeccion(id){
  ocultarSecciones();
  let seccion1=document.getElementById(id);
  let listaClases1=seccion1.classList //obtiene la lista de las clases del elemento
  listaClases1.add("activa")
  console.log(listaClases1)
  if (id == "contactos") {
    pintarContactos(listaContactos);
}
if (id == "creditosVip") {
    actualizarCreditosVip();
  }
}
 
function guardarTasa(){
  let cmpTasa=recuperarInt("tasaInteres");
  if (cmpTasa>=10 && cmpTasa<=20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+cmpTasa+" %")
    tasaInteres=cmpTasa;
  }else{
    mostrarTexto("mensajeTasa","Tasa debe estar entre 10% y 20%")
 
  }
}

function guardarMontoMaximo() {
  let cmpMontoMax = recuperarFloat("montoMaximoPrestar");
  
  if (cmpMontoMax >= 10 && cmpMontoMax <= 20000) {
    mostrarTexto("mensajeMonto", "Monto máximo configurado correctamente: $ " + formatearDinero(cmpMontoMax));
    montoMaximo = cmpMontoMax; // Guarda el valor en la variable global
  } else {
    mostrarTexto("mensajeMonto", "El monto máximo debe estar entre $10 y $20,000");
    mostrarTextoEnCaja("montoMaximoPrestar", "");
  }
}
 
function guardarCliente(){
  let cmpCedula=recuperarTexto("cedula");
  let cmpNombre=recuperarTexto("nombre");
  let cmpApellido=recuperarTexto("apellido");
  let cmpIngresos=recuperarFloat("ingresos");
  let cmpEgresos=recuperarFloat("egresos");
  let cmpEmail=recuperarTexto("email");
  let cmpTelefono=recuperarTexto("telefono");

  let cliente={
    cedula:cmpCedula,
    nombre:cmpNombre,
    apellido: cmpApellido,
    ingresos: cmpIngresos,
    egresos: cmpEgresos,
    email: cmpEmail,
    telefono: cmpTelefono
  }
    console.log(cliente)
    clienteSeleccionado = buscarCliente(cmpCedula)
 
    if(clienteSeleccionado!=null){
      // if(clientes[clienteSeleccionado].cedula!=cliente.cedula){
      //   alert("NO SE PERMITE MODIFICAR LA CEDULA")
      // }
      clienteSeleccionado.nombre=cliente.nombre
      clienteSeleccionado.apellido=cliente.apellido
      clienteSeleccionado.ingresos=cliente.ingresos
      clienteSeleccionado.egresos=cliente.egresos
      clienteSeleccionado.email=cliente.email
      clienteSeleccionado.telefono=cliente.telefono

    }else{
    clientes.push(cliente)// se guarda el objeto
    console.log(clientes)
    console.log(clientes.toString())
    }
    pintarCliente()
    limpiar()
}
 
function pintarCliente (){
  let tabla=document.getElementById("tablaClientes");
  let contenidoTabla="<tr>"
  for (let i=0;i<clientes.length;i++){
    let objCliente=clientes[i];
    contenidoTabla+="<td>"+objCliente.cedula+"</td>"
    contenidoTabla+="<td>"+objCliente.nombre+"</td>"
    contenidoTabla+="<td>"+objCliente.apellido+"</td>"
    contenidoTabla+="<td>"+objCliente.ingresos+"</td>"
    contenidoTabla+="<td>"+objCliente.egresos+"</td>"
    contenidoTabla+="<td>"+objCliente.email+"</td>"
    contenidoTabla+="<td>"+objCliente.telefono+"</td>"

    contenidoTabla+="<td>"+
            "<button onclick=seleccionarCliente("+objCliente.cedula+")>Actualizar</button>"+
            "<button>Eliminar</button>"+
          "</td></tr>"
  }
 
  tabla.innerHTML=contenidoTabla;
}
 
function buscarCliente(cedula){
  for (let i=0;i<clientes.length;i++){
    let objCliente=clientes[i];
    if(objCliente.cedula==cedula){
      return clientes[i];
    }
  }
  return null
}
 
function seleccionarCliente(cedula){
  clienteSeleccionado=buscarCliente(cedula)
  if(clienteSeleccionado!=null){
    mostrarTextoEnCaja("cedula",clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombre",clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellido",clienteSeleccionado.apellido);
    mostrarTextoEnCaja("ingresos",clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresos",clienteSeleccionado.egresos);
    mostrarTextoEnCaja("email",clienteSeleccionado.email);
    mostrarTextoEnCaja("telefono",clienteSeleccionado.telefono);


  }
}
 
function limpiar(){
   mostrarTextoEnCaja("cedula","")
    mostrarTextoEnCaja("nombre","")
    mostrarTextoEnCaja("apellido","")
    mostrarTextoEnCaja("ingresos","")
    mostrarTextoEnCaja("egresos","")
    mostrarTextoEnCaja("email","")
    mostrarTextoEnCaja("telefono","")

    clienteSeleccionado=null
}

// function buscarClienteCredito(){
//   let cmpCliente = recuperaraTexto("buscarCedulaCredito")  
//   let indice = buscarCliente(cmpCliente)

//   if(indice != null){
//     let clienteRecuperado = clientes[indice]              
//     let contenido = document.getElementById("datosClienteCredito")  

//     contenido.innerHTML = ""                              
//     contenido.innerHTML += "<h3>Datos Cliente</h3>"
//     contenido.innerHTML += "<p><b>Cédula:</b> " + clienteRecuperado.cedula + "</p>"
//     contenido.innerHTML += "<p><b>Nombre:</b> " + clienteRecuperado.nombre + " " + clienteRecuperado.apellido + "</p>"
//     contenido.innerHTML += "<p><b>Ingresos:</b> " + clienteRecuperado.ingresos + "</p>"
//     contenido.innerHTML += "<p><b>Egresos:</b> " + clienteRecuperado.egresos + "</p>"
//     clienteSeleccionado = indice                         
//   } else {
//     alert("Cliente No Encontrado")
//   }
// }
 //LÓGICA DE PROGRAMACIÓN PARA EL SIMULADOR
 // Contiene funciones de cálculo matemático
 
 
// 2. Calcula el valor sobrante a fin de mes [cite: 7, 8]
function calcularDisponible(ingresos, egresos) {
    let resultado = ingresos - egresos;
    // Si el valor es menor que cero, retorna cero [cite: 11]
    if (resultado < 0) {
        return 0;
    }
    return resultado;
}
 
// 4. Calcula la capacidad de pago (50% del disponible) [cite: 29, 30]
function calcularCapacidadPago(montoDisponible) {
    let capacidad = montoDisponible * 0.5;
    return capacidad;
}
 
// 6. Calcula el interés simple (Monto * Tasa/100 * Plazo) [cite: 38, 41]
function calcularInteresSimple(monto, tasa, plazoAnios) {
    let interes = plazoAnios * monto * (tasa / 100);
    return interes;
}
 
// 8. Calcula el total a pagar sumando monto, interés y tasa SOLCA [cite: 55, 56]
function calcularTotalPagar(monto, interes) {
    // Se agregan USD 100 por impuestos y SOLCA [cite: 56]
    let total = monto + interes + 100;
    return total;
}
 
// 10. Calcula la cuota dividiendo el total para los meses (plazo * 12) [cite: 64, 65]
function calcularCuotaMensual(total, plazoAnios) {
    let meses = plazoAnios * 12;
    let cuota = total / meses;
    return cuota;
}
 
// 13. Compara si la capacidad de pago cubre la cuota del préstamo [cite: 73]
function aprobarCredito(capacidadPago, cuotaMensual) {
    // Retorna true si la capacidad es mayor a la cuota [cite: 74]
    if (capacidadPago > cuotaMensual) {
        return true;
    } else {
        return false;
    }
}
 
// function mostrarResultado(){
//   let resultadoCredito = document.getElementById("resultadoCredito")
//   let contenido = ""
//   let montoDisponible = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos)
//   contenido += `<br>Capacidad De Pago ${calcularCapacidadPago(montoDisponible)} </br>`
//   resultadoCredito.innerHTML = contenido
 
// }

function buscarClienteCredito() {
  let cmpCedula = recuperarTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cmpCedula);
 
  let resultadoCliente = recuperarElemento("datosClienteCredito");
  let contenedor = "";
 
  clienteSeleccionado = null;
 
  if (cliente !== null) {
    clienteSeleccionado = cliente;
 
    contenedor = `
                  <h3>Datos del Cliente</h3>
                  <p><strong>Cédula:</strong>${cliente.cedula}</p>
                  <p><strong>Nombre:</strong>${cliente.nombre}</p>
                  <p><strong>Apellido:</strong>${cliente.apellido}</p>
                  <p><strong>Ingresos:</strong>${cliente.ingresos}</p>
                  <p><strong>Egresos:</strong>${cliente.egresos}</p>
                   `;
  } else {
    contenedor = `
                 <h3> El cliente no Existe </h3>
                 `;
  }
 
  resultadoCliente.innerHTML = contenedor;
}
 
function formatearDinero(valor) {
  return new Intl.NumberFormat("es-EC", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}
 
function calcularCredito() {
  let montoCredito = recuperarFloat("montoCredito");
  let plazoCredito = recuperarInt("plazoCredito");
  let solicitarCredito = recuperarElemento("btnSolicitarCredito");
  let resultadoCredito = recuperarElemento("resultadoCredito");
  let contenedor = "";
 
  resultadoCredito.classList.remove("aprobado");
  resultadoCredito.classList.remove("rechazado");
 
  if (clienteSeleccionado === null) {
    contenedor = `
      <h3>No es posible calcular</h3>
      <p>Por favor busca y selecciona un cliente existente.</p>
    `;
 
    resultadoCredito.innerHTML = contenedor;
    return;
  }
 
  if (isNaN(montoCredito) || montoCredito <= 0) {
    contenedor = `
      <h3>Monto inválido</h3>
      <p>Ingresa un monto de crédito válido.</p>
    `;
 
    resultadoCredito.innerHTML = contenedor;
    return;
  }
 
  if (isNaN(plazoCredito) || plazoCredito <= 0) {
    contenedor = `
      <h3>Plazo inválido</h3>
      <p>Ingresa un plazo válido en años.</p>
    `;
 
    resultadoCredito.innerHTML = contenedor;
    return;
  }
 
  let montoDisponible = calcularDisponible(
    clienteSeleccionado.ingresos,
    clienteSeleccionado.egresos,
  );
 
  let capacidadPago = calcularCapacidadPago(montoDisponible);
  let interes = calcularInteresSimple(montoCredito, tasaInteres, plazoCredito);
  let totalPago = calcularTotalPagar(montoCredito, interes);
  let cuotaMensual = calcularCuotaMensual(totalPago, plazoCredito);
  let estadoCredito = aprobarCredito(capacidadPago, cuotaMensual);
 
  let mensaje = "";
 
  resultadoCredito.classList.add(!estadoCredito ? "rechazado" : "aprobado");
  mensaje = estadoCredito ? "Aprobado" : "Rechazado";
 
  if (estadoCredito) {
    solicitarCredito.disabled = false;
  }
 
  cuotaCalculada = cuotaMensual;
  montoCalculado = montoCredito;
  plazoCalculado = plazoCredito;
  creditoAprobado = estadoCredito;
 
  contenedor = `
    <h3>Resultados Crédito</h3>
 
    <p><strong>Capacidad de pago:</strong> $ ${formatearDinero(capacidadPago)}</p>
    <p><strong>Total a pagar:</strong> $ ${formatearDinero(totalPago)}</p>
    <p><strong>Cuota mensual:</strong> $ ${formatearDinero(cuotaMensual)}</p>
 
    <br>
 
    <p><strong>Resultado:</strong> ${mensaje}</p>
  `;
 
  resultadoCredito.innerHTML = contenedor;
}
function solicitarCredito(){
  credito={cedula:clienteSeleccionado.cedula,
    nombre:clienteSeleccionado.nombre,
    apellido:clienteSeleccionado.apellido,
    monto:montoCalculado,
    tasa:tasaInteres,
    plazo:plazoCalculado,
    cuota:cuotaCalculada
  }
  creditos.push(credito);

}
function pintarCreditos(creditos){
  let tabla = recuperarElemento("tablaCreditos");
  let contenidoTabla = "";
  for (let i=0; i<creditos.length; i++){
    let credito = creditos[i];
    contenidoTabla += `<tr>
          <td>${credito.cedula}</td>
          <td>${credito.nombre}</td>
          <td>${credito.apellido}</td>
          <td>${credito.monto}</td>
          <td>${credito.tasa}</td>
          <td>${credito.plazo}</td>
          <td>${credito.cuota}</td>
          <td><button onclick = "eliminarCredito(${credito.cedula})">Eliminar</button></td>
        </tr>`
  }
  tabla.innerHTML=contenidoTabla;
}

function buscarCreditos(cedula){
  let creditosCliente = [ ];
  for (let i=0; i<creditos.length; i++){
  let credito = creditos[i];
  if(cedula == credito.cedula
  ){
    creditosCliente.push(creditos[i])
  } 
  }
  return creditosCliente
}

function buscarCreditosCliente(){
let campoCedula = recuperarTexto("buscarCedulaListado");
let creditoRecuperado = buscarCreditos(campoCedula);
if(creditoRecuperado != null){
  pintarCreditos(creditoRecuperado)
}


}
function eliminarCredito(cedula) {
    for (let i = 0; i < creditos.length; i++) {
        if (creditos[i].cedula == cedula) {
            creditos.splice(i, 1);
            break;
        }
    }
    pintarCreditos(creditos);
}

function pintarContactos(listaContactos) {
    let tabla = recuperarElemento("tablaContactos");
    let contenedor = "";
    for (let i = 0; i < listaContactos.length; i++) {
        let contacto = listaContactos[i];
        contenedor += `
            <tr>
                <td>${contacto.nombre}</td>
                <td>${contacto.numero}</td>
            </tr>
        `;
    }
    tabla.innerHTML = contenedor;
}

function buscarContactos(filtro) {
    let cmpFiltro = recuperarTexto("buscarContactos");
    let filtroContactos = [];

    if (filtro == "nombre") {
        for (let i = 0; i < listaContactos.length; i++) {
            let contacto = listaContactos[i];
            if (contacto.nombre == cmpFiltro) {
                filtroContactos.push(contacto);
            }
        }
        pintarContactos(filtroContactos);
    }

    if (filtro == "numero") {
        for (let i = 0; i < listaContactos.length; i++) {
            let contacto = listaContactos[i];
            if (contacto.numero == cmpFiltro) {
                filtroContactos.push(contacto);
            }
        }
        pintarContactos(filtroContactos);
    }
}

function ordenarContactos() {
    let contactosOrdenados = [];

    // Crea una copia y ordena alfabéticamente por nombre
    contactosOrdenados = listaContactos.slice().sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
    });

    // Envía la lista ordenada a la función encargada de actualizar la tabla
    pintarContactos(contactosOrdenados);
}

function actualizarCreditosVip() {
  let tablaVip = recuperarElemento("tablaCreditosVip");
  let contenidoTabla = "";

  for (let i = 0; i < creditos.length; i++) {
    let credito = creditos[i];

    if (credito.monto >= 5000) {
      
      // Buscamos al cliente en el arreglo global para obtener sus Ingresos y Egresos
      let infoCliente = buscarCliente(credito.cedula);
      
      contenidoTabla += `<tr>
        <td>${credito.cedula}</td>
        <td>${credito.nombre}</td>
        <td>${credito.apellido}</td>
        <td>$ ${formatearDinero(credito.monto)}</td>
        <td>$ ${formatearDinero(credito.cuota)}</td>
      </tr>`;
    }
  }

  tablaVip.innerHTML = contenidoTabla;
}