import React , { Component} from 'react';

class Conceptos extends Component{
    render(){
        return (
            <div className="container">
                <h3> Conceptos</h3>
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addConcepto}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="conceptodesc" onChange={this.handleChange} value={this.state.conceptodesc} placeholder="Ingrese un concepto" type="text" autoFocus />
                                            <label for="conceptodesc">Descripción de concepto</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div>
                                        <label for="group1">Tipo de Concepto</label>
                                        
                                        <div className="input-field col s12">
                                            
                                            <label>
                                            <input name="group1" onChange={this.handleOptionChange} value="Ingreso"  type="radio" checked={this.state.conceptotipo==="Ingreso"}/>
                                            <span>Ingreso</span>
                                            </label>
                                        </div>
                                        <div className="input-field col s12">
                                            <label>    
                                            <input name="group1" onChange={this.handleOptionChange} value="Egreso"  type="radio" checked ={this.state.conceptotipo==="Egreso"} />
                                            <span>Egreso</span>
                                            </label>
                                        </div>
                                        </div>
                                        
                                    </div>

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Conceptos;