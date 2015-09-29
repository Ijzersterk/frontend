import React from 'react';

export default React.createClass({
    render(){
        return <div className="col-md-8 col-md-offset-2 col-xs-12">
            <h1>The gym</h1>
            <p>DSKV IJzersterks works out in two places at the Sport and Culture unit of Delft.
            One is the regular gym and the other is the Vereniging Kracht Ruimte (Assocation Strength Gym). As the name says the VRK can only be used by assocations, it also the only place where we can train as IJzersterk. Currently that is on saturday from 11:00.</p>
            <h3>Regular gym</h3>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <div className="thumbnail">
                        <img src="img/row.JPG"/>
                    </div>
                </div>
                <div className="col-md-6 col-xs-12">
                    <div className="thumbnail">
                        <img src="img/gym_upstairs.JPG"/>
                    </div>
                </div>

            </div>
            <p>On the ground floor of the gym there different types of weight and exercise machines. For the exercise machines there are bicycles, cross trainers, stairmaster and rowing machings.</p>
            <p>The first floor exists solely of power equipment, below you can find a list of all the materials which are present. On the balcony on the first floor, there is room for stretching and ab exercises.</p>

            <p>There are no bumperplates nor are there any platforms.</p>

            <p>The following are present:</p>
            <ul>
                <li>5x 20kg Barbell</li>
                <li>2x 12,5kg Small Barbell</li>
                <li>2x Ez-curl bar</li>
                <li>1x Parralel bar</li>
                <li>1x Hex bar</li>
                <li>Dumbbels till 48kg</li>
                <li>3x Benchracks</li>
                <li>Dubbel squat-rack with adjustable safeties</li>
                <li>2x Squat racks withouth safeties</li>
                <li>1x T-bar row</li>
                <li>2x Smithmachine</li>
                <li>2x Lat pulldown</li>
                <li>1x Roman chair</li>
                <li>1x Set of rings</li>
                <li>1x Supported row station</li>
                <li>1x Legpress</li>
                <li>1x Dubbel pulley</li>
            </ul>
            <h3>VKR</h3>
            <p>The VKR constists of two small rooms. The following are present:</p>
            <ul>
                <li>2x Lat pulldown</li>
                <li>1 Deadlift platform</li>
                <li>2x Squat racks</li>
                <li>2x Eleiko barbells</li>
                <li>2x Regular 20kg barbells</li>
                <li>1x Roman chair</li>
                <li>1x Supported row station</li>
            </ul>
        </div>;
    }
});
