import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = useState(valueStart)
    useEffect(() => {
        setValue(valueEnd)
    }, [valueEnd])

    return children(value)
}

const Progressbar = ({ value, total }) => {
    return (
        <ProgressProvider valueStart={0} valueEnd={value}>
            {num => (
                <CircularProgressbar
                    value={(num / total) * 100}
                    text={`${num}人`}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'round',
                        textSize: '1.3rem',
                        pathTransitionDuration: 4,
                        pathColor: `#A34059`,
                        textColor: '#A34059',
                        trailColor: 'rgba(163, 64, 89,.2)',
                    })}
                />
            )}
        </ProgressProvider>
    )
}

export default Progressbar
