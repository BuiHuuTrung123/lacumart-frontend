import React from 'react'
import { Paper, Stepper, Step, StepLabel } from '@mui/material'

const ProgressStepper = ({ activeStep, steps }) => {
    return (
        <Paper
            sx={{
                p: 4,
                mb: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
            }}
        >
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label': {
                                    color: 'white !important',
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Paper>
    )
}

export default ProgressStepper