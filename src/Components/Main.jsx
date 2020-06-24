import React, { Component } from 'react';
import data from './../Data/jobs.json'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            showAdvance: false,
            locations: [],
            experiences: []
        }
    }

    componentDidMount = () => {
        let locations = []
        let experiences = []
        data['jobs'].map(element => {
            locations.push(element.location)
            experiences.push(element.experience)
        })

        this.setState({
            jobs: data['jobs'],
            locations: locations,
            experiences: experiences
        })
    }

    onSelect = (e) => {
            console.log(e.target.value,e.target.name)
            let newjobs =[]
            if(e.target.name == 'all')
            {
                this.setState({
                    jobs:data['jobs']
                })
            }
            data['jobs'].map(element => {
                if(element.type == e.target.name)
                {
                    newjobs.push(element)
                }
            })
            this.setState({
                jobs:newjobs
            })
    }
    handleJobChange = (e) => {
        console.log(e.target.value)
        let usersearch = e.target.value.toLowerCase()
        let jobs = data['jobs'].filter(element => {
            let jobsInDatabase = element.title.toLowerCase() 
            let jobsInDatabase1 = element.company.toLowerCase()
            let jobsInDatabase2 = element.location.toLowerCase()
            if(jobsInDatabase.indexOf(usersearch) !== -1)
            {
            return jobsInDatabase.indexOf(usersearch) !== -1
            }
            if(jobsInDatabase1.indexOf(usersearch) !== -1)
            {
                return jobsInDatabase1.indexOf(usersearch) !== -1
            }
            if(jobsInDatabase2.indexOf(usersearch) !== -1)
            {
                return jobsInDatabase2.indexOf(usersearch) !== -1
            }
        })
        this.setState({
            jobs
        })
    }

    advanceSwitch = () => {
        this.setState({
            showAdvance: !this.state.showAdvance
        })
    }

    locationSearch = (val) => {
        if(val == 'clear')
        {
            this.setState({
                jobs:data['jobs']
            })
        }
        else
        {
        let newjobs = []
            data['jobs'].map( element => {
                if(element.location == val)
                {
                    newjobs.push(element)
                }
            })
            console.log(newjobs)
            this.setState({
                jobs:newjobs
            })
        }
    }

    experienceFilter = (val) => {
        if(val == 'clear')
        {
            this.setState({
                jobs:data['jobs']
            })
        }
        else
        {
        let newjobs = []
            data['jobs'].map( element => {
                if(element.experience == val)
                {
                    newjobs.push(element)
                }
            })
            console.log(newjobs)
            this.setState({
                jobs:newjobs
            })
        }
    }
    render() {
        let jobsList = this.state.jobs.map(element => {
            let skills = element.skills.join(' , ')
            return <div className="border rounded shadow-sm p-4 mt-4 col-xl-10 col-lg-10 ">
                <p>{element.title}</p>
                <p className="row m-0">{element.company} | {element.location} | {element.experience} yrs exp</p>
                <div>Skills : {skills}</div>
                <div className="justify-content-end d-flex"><button className="btn btn-primary">Apply</button></div>
            </div>
        })

        return (
            <div >
                <div className="row col-xl-12 justify-content-around">
                    <input className="m-2" onChange={(e) => this.handleJobChange(e)}></input>
                    <div className="row p-3 ml-2 ">
                        <input type="checkbox" name="all" onChange={(e)=>this.onSelect(e)}></input>
                        <h4 >All</h4>
                    </div>
                    <div className="row p-3 ml-2 ">
                        <input type="checkbox" name="full" onChange={(e)=>this.onSelect(e)}></input>
                        <h4 className="text-center"  onChange={(e)=>this.onSelect(e)}>Full-time</h4>
                    </div>
                    <div className="row p-3 ml-2 ">
                        <input type="checkbox" name="parttime" onChange={(e)=>this.onSelect(e)}></input>
                        <h4 >Part-time</h4>
                    </div>
                    <div className="row p-3 ml-2 ">
                        <input type="checkbox" name="free" onChange={(e)=>this.onSelect(e)}></input>
                        <h4 >Freelancer</h4>
                    </div>
                    <div>
                        <button className="btn btn-secondary">Search</button>
                    </div>
                </div>
                <div className="container">
                    <button className="btn" onClick={this.advanceSwitch}>Advance Search </button>
                    {this.state.showAdvance ? (
                        <div className = "row justify-content-between d-flex">
                            <div  className ="p-2 ">
                                {this.state.locations.map(place => {
                                    return <button className ="btn btn-primary" onClick={()=>this.locationSearch(place)}>{place}</button>
                                })}
                                <button className="btn btn-danger" onClick={()=>this.locationSearch('clear')}>X</button>
                                <p>Search By Location</p>
                            </div>
                            <div>
                                {this.state.experiences.map(expr => {
                                    return <button className = "btn btn-warning" onClick={()=>this.experienceFilter(expr)}>{expr}</button>
                                })}
                                <button className="btn btn-danger" onClick={()=>this.experienceFilter('clear')}>X</button>
                                <p>Search By experience</p>
                            </div>
                        </div>
                    ) : ('')}
                </div>
                <div className="container">
                    {jobsList}
                </div>
            </div>
        );
    }
}
