import React, { Component } from 'react';

import ReacTable from 'react-table';
import { runInThisContext } from 'vm';
//import 'react-table/react-table.css';


class Conceptos extends Component {


    constructor() {
        super();
        this.state = {
            id: '',
            conceptodesc: '',
            conceptotipo: 'Egreso',
            conceptosarray: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleButtonEdit = this.handleButtonEdit.bind(this);
        this.addConcepto = this.addConcepto.bind(this);
        this.HandleClean= this.HandleClean.bind(this);
    };



    componentDidMount() {
        this.fetchConceptos();
    }

    handleButtonEdit(e, row) {
        console.log(row);
        console.log(row.original._id);

        fetch(`/api/conceptos/${row.original._id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    conceptodesc: data.conceptodesc,
                    conceptotipo: data.conceptotipo,
                    id: data._id
                });
            });
    };

    HandleClean(e) {

        this.setState({
            id:'',
            conceptodesc:'',
            conceptotipo:'Egreso'

        });
        
        window.M.toast({html: 'Datos Limpiados'});

    };
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value


        });
        console.log(name, value);
    };

    handleOptionChange(e) {
        this.setState({
            conceptotipo: e.target.value
        })
        console.log(this.state.conceptotipo, e.target.value);
    };

    fetchConceptos() {
        fetch('/api/conceptos')
            .then(res => res.json())
            .then(data => {
                this.setState({ conceptosarray: data });
                console.log("Colleccion de conceptos");
                console.log(this.state.conceptosarray);
            });
    };

    deleteConcepto(e, row) {
        console.log(row);
        console.log(row.original._id);

        if (confirm("Confirma Borrado Registo")) {

            fetch(`/api/conceptos/${row.original._id}`, {
                method: 'DELETE',
                headers: {
                    'Accepet': 'applicatiob/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Concepto Eliminado' });
                    this.fetchConceptos();
                })
                .catch(err => console.log(err));


        }

    };

    addConcepto(e) {
        e.preventDefault();
        if (this.state.id) {
            console.log('entra en editar');

            fetch(`/api/conceptos/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    conceptodesc: this.state.conceptodesc,
                    conceptotipo: this.state.conceptotipo
                }),
                headers: {
                    'Accepet': 'applicatiob/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Concepto Editado' });
                    this.setState({ _id: '', conceptodesc: '', conceptotipo: 'Egreso' });
                    this.fetchConceptos();
                })
                .catch(err => console.log(err));



        } else {

            console.log('entra en nuevo');
            fetch('/api/conceptos', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accepet': 'applicatiob/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Concepto Guardado' });
                    this.setState({ _id: '', conceptodesc: '', conceptotipo: 'Egreso' });
                    this.fetchConceptos();
                })
                .catch(err => console.log(err));

        }

    };

    render() {

        const columns = [{
            id: 'ConceptoId',
            Header: 'Concepto',
            accessor: d => d.conceptodesc

        }, {
            id: 'TipoId',
            Header: 'Tipo',
            accessor: d => d.conceptotipo
        },
        {
            header: 'Acción',
            id: 'Edit',
            accessor: 'Edit',
            //render: ({row}) => ( <button onClick= {(e) => this.handleButtonEdit(e,row)}>Editar</button>)
            width: 60,
            filterable:false,
            Cell: row => (<button className="waves-effect waves-ligth btn-small"
                onClick={(e) => this.handleButtonEdit(e, row)}>
                <i className="material-icons center">edit</i></button>)

        },
        {
            header: '',
            id: 'Delete',
            accessor: 'Delete',
            width: 60,
            filterable:false,
            //render: ({row}) => ( <button onClick= {(e) => this.handleButtonEdit(e,row)}>Editar</button>)
            Cell: row => (<button className="waves-effect waves-ligth btn-small"
                onClick={(e) => this.deleteConcepto(e, row)}>
                <i className="material-icons center">delete</i></button>)
        },

        ];




        return (
            <div className="container center">
                <h3> Conceptos</h3>
                <div className="row">
                    <div className="col s6 offset-s3">
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
                </div>
                <div className="container">
                    <ReacTable
                        data={this.state.conceptosarray}
                        columns={columns}
                        defaultPageSize={8}
                        className="-striped -highlight"
                        filterable={true}
                    />

                </div>


            </div>
        );
    }

}

export default Conceptos;