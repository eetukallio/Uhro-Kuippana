import React from 'react';

class HourForm extends React.Component {
    render() {
        return (
            <div className="hourForm">
                <form action="BACKEND-OSOITE" method="post">
                    <label htmlFor="">Tunnit:</label>
                    <input type="text"/>
                </form>
            </div>
        )
    }
}

export default HourForm;