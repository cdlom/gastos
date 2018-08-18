import React, { Component } from 'react';

class Estimados extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            periodo: '',
            estimados:[],
            
        };
        this.handleDateChange = this.handleDateChange.bind(this);
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

    }


    handleDateChange(e) {

        var mes = e.getMonth()+1;

        if (mes< 10) {mes = '0' + mes}
        var ano = e.getFullYear()

        var periodo = ano.toString()+mes.toString();

        console.log(periodo);

        // const { name, value } = e.target;
        this.setState({
             periodo: periodo
         });
        console.log(periodo);
    };

    render() {
        return (
            <div className="Containar center">
                <h3>Estimados</h3>

                <div className="row">
                    <div className="col s12">
                        <form onSubmit={this.fetchPeriodo}>
                            <div className="row">
                                <div className="input-field col s3 offset-s3">
                                    <input name="periodo" type="text" className='datepicker'  value={this.state.periodo} placeholder="Seleccione un Período" />
                                    { <label htmlFor="periodo">Período</label> }
                                    {/* <input type="date" /> */}
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }

}

export default Estimados;