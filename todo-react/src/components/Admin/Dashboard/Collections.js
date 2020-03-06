import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart } from "react-google-charts";


class Collections extends Component {

    render() {
        
        const weekcollection = {
            'Week1':8175000,
            'Week2':3792000,
            'Week3':2695000,
            'Week4':2099000,
        }
        const monthlycollection = {
            'January':8175000,
            'February':3792000,
            'March':2695000,
            'April':2099000,
            'May':8175000,
            'June':3792000,
            'July':2695000,
            'August':2099000,
            'September':8175000,
            'October':3792000,
            'November':2695000,
            'December':2099000,
        }
        const yearcollection = {
            'A':28175000,
            'B':33792000,
           
        }

        return (
            <React.Fragment>
                 <Col xs={12} md={4} style={{ padding: '1em',minHeight:'10em',height:'auto' }}>
                     <Row>
                       
                        <Col xs={12} md={12}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading weekly collections...</div>}
                            data={[
                                ['Week', 'January'],
                                ['Week 1',parseInt(`${weekcollection.Week1}`)],
                                ['Week 2', parseInt(`${weekcollection.Week2}`)],
                                ['Week 3', parseInt(`${weekcollection.Week3}`)],
                                ['Week 4', parseInt(`${weekcollection.Week4}`)],
                              ]}
                              options={{
                                title: 'Weekly Collections',
                                chartArea: { width: '50%' },
                                hAxis: {
                                  title: 'Collections',
                                  minValue: 0,
                                },
                                vAxis: {
                                  title: 'Weeks',
                                },
                              }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                     </Row>
                 </Col>
                 <Col xs={12} md={4} style={{ padding: '1em' }}>
                     <Row>
                       
                        <Col xs={12} md={12}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading monthly collections...</div>}
                            data={[
                                ['Month', '2020'],
                                ['January',parseInt(`${monthlycollection.January}`)],
                                ['February', parseInt(`${monthlycollection.February}`)],
                                ['March', parseInt(`${monthlycollection.March}`)],
                                ['April', parseInt(`${monthlycollection.April}`)],
                                ['May',parseInt(`${monthlycollection.May}`)],
                                ['June', parseInt(`${monthlycollection.June}`)],
                                ['July', parseInt(`${monthlycollection.July}`)],
                                ['August', parseInt(`${monthlycollection.August}`)],
                                ['September',parseInt(`${monthlycollection.September}`)],
                                ['October', parseInt(`${monthlycollection.October}`)],
                                ['November', parseInt(`${monthlycollection.November}`)],
                                ['December', parseInt(`${monthlycollection.December}`)],
                              ]}
                              options={{
                                title: 'Monthly Collections',
                                chartArea: { width: '50%' },
                                hAxis: {
                                  title: 'Collections',
                                  minValue: 0,
                                },
                                vAxis: {
                                  title: 'Months',
                                },
                              }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                     </Row>
                 </Col>
                 <Col xs={12} md={4} style={{ padding: '1em' }}>
                     <Row>
                        
                        <Col xs={12} md={12}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading yearly collections...</div>}
                            data={[
                                ['Year', ''],
                                ['2019',parseInt(`${yearcollection.A}`)],
                                ['2020', parseInt(`${yearcollection.B}`)],
                              ]}
                              options={{
                                title: 'Yearly Collections',
                                chartArea: { width: '50%' },
                                hAxis: {
                                  title: 'Collections',
                                  minValue: 0,
                                },
                                vAxis: {
                                  title: 'Year',
                                },
                              }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col>
                     </Row>
                 </Col>
            </React.Fragment>
        )
    }
}

Collections.propTypes = {

};

export default Collections;