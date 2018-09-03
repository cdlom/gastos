import React, { Component } from 'react';


import ReacTable from 'react-table';
import { runInThisContext } from 'vm';
import _ from 'lodash';


class Estimados extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            periodo: '',
            fullperiodo: [],
            fullpronostico: [],
            Saldopronostico: 0,
            conceptosarray: [],
            periodoloaded: false

        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.fetchPeriodo = this.fetchPeriodo.bind(this);
        this.HandleCleanPeriodo = this.HandleCleanPeriodo.bind(this);
        this.HandleLoadConceptos = this.HandleLoadConceptos.bind(this);
        //   this.handleOptionChange = this.handleOptionChange.bind(this);
        //   this.handleButtonEdit = this.handleButtonEdit.bind(this);
        //   this.addConcepto = this.addConcepto.bind(this);
        //   this.HandleClean = this.HandleClean.bind(this);
    };


    componentDidMount() {
        //window.$('.datepicker').pickadate({
        //    selectMonths: true,
        //    selecYears: 15
        var elem = document.querySelectorAll(".datepicker");
        var instance = M.Datepicker.init(elem, {
            selectMonths: true,
            selecYears: 15,
            format: "yyyymm",
            onSelect: this.handleDateChange

        });

        this.fetchConceptos();

    }


    HandleLoadConceptos() {

        var i = 0;

        for (i = 0; i < this.state.conceptosarray.length; i++) {



            fetch(`/api/periodos/addpronostico/${this.state.fullperiodo._id}`, {
                method: 'POST',
                body: JSON.stringify( {
                    "periodo": this.state.periodo,
                    "pronostico": {
                        "pronosticoid": this.state.conceptosarray[i]._id,
                        "pronosticodesc": this.state.conceptosarray[i].conceptodesc,
                        "pronosticotipo": this.state.conceptosarray[i].conceptotipo,
                        "pronosticoimporte": this.state.conceptosarray[i].conceptoimporte
                    }
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // window.M.toast({ html: 'Concepto Guardado' });
                    // this.setState({ _id: '', conceptodesc: '', conceptotipo: 'Egreso' , conceptoimporte: 0 });
                    // this.fetchConceptos();
                })
                .catch(err => console.log(err));



        };

        this.fetchPeriodo();

    };


    HandleCleanPeriodo() {
        console.log("full periodo");
        console.log(this.state.fullperiodo);

        /// obtener el periodo , por el periodo y no por el id
        fetch(`/api/periodos/deleteallpronostico/${this.state.fullperiodo._id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.M.toast({ html: 'Pronosticos Eliminados' });
                this.fetchPeriodo();
            })
            .catch(err => console.log(err));


    }

    fetchConceptos() {
        fetch('/api/conceptos')
            .then(res => res.json())
            .then(data => {
                this.setState({ conceptosarray: data });
                console.log("Colleccion de conceptos");
                console.log(this.state.conceptosarray);
            });
    };

    fetchPeriodo(e) {
        //e.preventDefault();
        /// obtener el periodo , por el periodo y no por el id
        fetch(`/api/periodos/periodo/${this.state.periodo}`)
            .then(res =>
                res.json())
            .then(data => {
                if (data.length > 0) {
                    // se encontro el período 
                    this.setState({
                        fullperiodo: data[0],
                        fullpronostico: data[0].pronostico,
                        //                       periodoloaded: true
                    });


                    console.log("Info del periodo");
                    console.log(this.state.fullperiodo);
                    console.log("Info del pronostico");
                    console.log(this.state.fullpronostico);

                    var i = 0;
                    var _fullpronostico = this.state.fullpronostico;
                    var _saldo = 0;

                    console.log("Info del _pronostico");
                    console.log(_fullpronostico.length);

                    for (i = 0; i < _fullpronostico.length; i++) {
                        console.log(_fullpronostico[i].pronosticotipo);

                        if (_fullpronostico[i].pronosticotipo === "Ingreso") {

                            _saldo = _saldo + _fullpronostico[i].pronosticoimporte

                        } else {

                            _saldo = _saldo - _fullpronostico[i].pronosticoimporte
                        }

                    }

                    this.setState({ Saldopronostico: _saldo });
                    console.log(this.state.Saldopronostico);
                }
                else {
                    // No se encontro el período crearlo
                    // this.setState({
                    //     fullperiodo: [],
                    //     fullpronostico: [],
                    //     Saldopronostico: 0,
                    //     //                   periodoloaded: false
                    // })



                    fetch("/api/periodos", {
                        method: 'POST',
                        body: JSON.stringify( {
                            "periodo": this.state.periodo,
                            "pronostico": []
                            
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("Nuevo Período");
                            console.log(data);
                             window.M.toast({ html: 'Período Creado' });
                            // this.setState({ _id: '', conceptodesc: '', conceptotipo: 'Egreso' , conceptoimporte: 0 });
                            // this.fetchConceptos();
                            
                            this.setState({
                                fullperiodo: data,
                                fullpronostico: data.pronostico
                                //                       periodoloaded: true
                            });
                        })
                        .catch(err => console.log(err));
        

                }
            });
    };

    handleDateChange(e) {

        var mes = e.getMonth() + 1;

        if (mes < 10) { mes = '0' + mes }
        var ano = e.getFullYear()

        var periodo = ano.toString() + mes.toString();

        console.log(periodo);

        // const { name, value } = e.target;
        this.setState({
            periodo: periodo,
            periodoloaded: true
        });
        console.log(periodo);
    };

    render() {

        const columns = [
            {
                id: 'TipoId',
                Header: 'Tipo',
                accessor: d => d.pronosticotipo
            },
            {
                id: 'ConceptoId',
                Header: 'Concepto',
                accessor: d => d.pronosticodesc

            }, {
                id: 'ImporteId',
                Header: 'Importe',
                accessor: d => d.pronosticoimporte,
                //accessor: "pronosticoimporte",
                //aggregate:  (vals, rows) => _.sum(vals)
                aggregate: vals => _.sum(vals),
                // Footer: () =>
                //     <div style={{ textAlign: "center" }}>
                //         <strong>Saldo:{this.state.Saldopronostico}</strong>
                //     </div>
            },
            {
                header: 'Acción',
                id: 'Edit',
                accessor: 'Edit',
                //render: ({row}) => ( <button onClick= {(e) => this.handleButtonEdit(e,row)}>Editar</button>)
                width: 60,
                filterable: false,
                Cell: row => (<button className="waves-effect waves-ligth btn-small"
                    onClick={(e) => this.handleButtonEdit(e, row)}>
                    <i className="material-icons center">edit</i></button>)

            },
            {
                header: '',
                id: 'Delete',
                accessor: 'Delete',
                width: 60,
                filterable: false,
                //render: ({row}) => ( <button onClick= {(e) => this.handleButtonEdit(e,row)}>Editar</button>)
                Cell: row => (<button className="waves-effect waves-ligth btn-small"
                    onClick={(e) => this.deleteConcepto(e, row)}>
                    <i className="material-icons center">delete</i></button>)
            },

        ];








        return (
            <div className="Containar center">
                <h3>Pronóstico</h3>

                <div className="row">
                    <div className="col s12">
                        <form >
                            <div className="row">
                                <div className="input-field col s3 offset-s3">
                                    <input name="periodo" type="text" className='datepicker' value={this.state.periodo} placeholder="Seleccione un Período" />
                                    {<label htmlFor="periodo">Período</label>}
                                    {/* <input type="date" /> */}
                                </div>
                                {/* </div> */}

                                {/* <div className="row"> */}
                                <div className="input-field col s1">
                                    <button type="button" className="waves-effect waves-ligth btn-small" onClick={this.fetchPeriodo} >Ejecutar</button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
                <div className="row">

                    <div className="col s4 ">
                        <div className="card">
                            <div className="card-content" >
                                <form onSubmit={this.addConcepto}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="conceptodesc" onChange={this.handleChange} value={this.state.conceptodesc} placeholder="Ingrese un concepto" type="text" autoFocus />
                                            <label htmlFor="conceptodesc">Descripción de concepto</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="conceptoimporte" onChange={this.handleChange} value={this.state.conceptoimporte} placeholder="Ingrese un importe" type="number" />
                                            <label htmlFor="conceptoimporte">Ultimo Importe</label>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="input-field col s3">
                                            <label >Tipo de Concepto</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field  col s3">

                                            <label>
                                                <input name="group1" onChange={this.handleOptionChange} value="Ingreso" type="radio" checked={this.state.conceptotipo === "Ingreso"} />
                                                <span>Ingreso</span>
                                            </label>
                                        </div>
                                        <div className="input-field col s1">
                                            <label>
                                                <input name="group1" onChange={this.handleOptionChange} value="Egreso" type="radio" checked={this.state.conceptotipo === "Egreso"} />
                                                <span>Egreso</span>
                                            </label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="input-field col s3">
                                            <button type="submit" className="waves-effect waves-ligth btn-small">Enviar</button>
                                        </div>
                                        <div className="input-field col s3">
                                            <button type="button" className="waves-effect waves-ligth btn-small" onClick={this.HandleClean}>Limpiar</button>
                                        </div>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>

                    <div className="col s8">

                        <div className="card ">
                            <div className="row">
                                <div className="input-field col s6">
                                    <button type="button" className="waves-effect waves-ligth btn-small" disabled={!this.state.periodoloaded} onClick={this.HandleCleanPeriodo} >Limpiar Pronóstico</button>
                                </div>
                                <div className="input-field col s6">
                                    <button type="button" className="waves-effect waves-ligth btn-small" disabled={!this.state.periodoloaded} onClick={this.HandleLoadConceptos}>Cargar últ. Pronóstico</button>
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <strong>Saldo:{this.state.Saldopronostico}</strong>
                            </div>
                            <div className="card-content" >
                                <ReacTable
                                    data={this.state.fullpronostico}
                                    columns={columns}
                                    defaultPageSize={5}
                                    className="-striped -highlight"
                                    filterable={true}
                                    pivotBy={['TipoId']}
                                />
                            </div>
                        </div>





                    </div>
                </div>
            </div >
        );
    }

}

export default Estimados;