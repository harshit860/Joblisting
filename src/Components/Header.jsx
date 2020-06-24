    import React from 'react'
    
    export default function Header() {
        return (
            <div style={{height:'10%'}} className="shadow mb-4 mt-2 p-1 row justify-content-around d-flex">
                <div className="display-4 border rounded border-primary">
                        logo
                </div>
                <div >
                       Employee
                </div>
                <div >
                        Applicants
                </div>
                <div  >
                        Support
                </div>
                <div>
                    <button className ="btn btn-success">Sign-in</button>
                </div>
                <div>
                    <button className ="btn btn-dark">Submit JOb</button>
                </div>
            </div>
        )
    }
    