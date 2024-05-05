import React from 'react'
import './JobCard.css'

const JobCard = ({ jobObject }) => {
    return (
        <div className="job-card">
            <div className="job-details">
                <h3>{jobObject?.companyName || ''}</h3>
                <p>{jobObject?.jobRole || ''}</p>
                <p>{jobObject?.location || ''}</p>
                <p>Estimated Salary: ₹12 - 16 LPA</p>
            </div>
            <div className="company-description">
                <h4>About Company:</h4>
                <p>
                    {jobObject?.jobDetailsFromCompany || ''}
                </p>
                <button className="show-more">Show more</button>
            </div>
            <div className="experience">
                <h4>Minimum Experience</h4>
                <p>{jobObject?.minExp || 0}</p>
            </div>
            <div className="actions">
                <button className="easy-apply">Easy Apply</button>
                <button className="ask-referral">Ask for referral</button>
            </div>
        </div>
    )
}

export default JobCard