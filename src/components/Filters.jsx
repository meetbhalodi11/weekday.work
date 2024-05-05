import React, { useState } from 'react';
import './Filters.css'

const Filters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        minExperience: '',
        companyName: '',
        location: '',
        techStack: [],
        role: [],
        minBasePay: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleMultiSelectChange = (e) => {
        const { name, options } = e.target;
        const selectedOptions = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
        setFilters({ ...filters, [name]: selectedOptions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    return (
        <form onSubmit={handleSubmit} className="job-filters">
            <div className="filter-item">
                <label>
                    Min Experience:
                    <select name="minExperience" value={filters.minExperience} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="1">0-1 year</option>
                        <option value="3">1-3 years</option>
                        <option value="5">3-5 years</option>
                    </select>
                </label>
            </div>

            <div className="filter-item">
                <label>
                    Company Name:
                    <input type="text" name="companyName" value={filters.companyName} onChange={handleInputChange} />
                </label>
            </div>

            <div className="filter-item">
                <label>
                    Location:
                    <select name="location" value={filters.location} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="chennai">Chennai</option>
                        <option value="bangalore">BLR</option>
                    </select>
                </label>
            </div>

            {/* <div className="filter-item">
                <label>
                    Remote/On-site:
                    <select name="remoteOnSite" multiple value={filters.remoteOnSite} onChange={handleMultiSelectChange}>
                        <option value="remote">Remote</option>
                        <option value="onsite">On-site</option>
                    </select>
                </label>
            </div> */}

            <div className="filter-item">
                <label>
                    Tech Stack:
                    <select name="techStack" multiple value={filters.techStack} onChange={handleMultiSelectChange}>
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                    </select>
                </label>
            </div>

            <div className="filter-item">
                <label>
                    Role:
                    <select name="role" multiple value={filters.role} onChange={handleMultiSelectChange}>
                        <option value="Frontend">Frontend Developer</option>
                        <option value="Backend">Backend Developer</option>
                    </select>
                </label>
            </div>

            <div className="filter-item">
                <label>
                    Min Base Pay:
                    <select name="minBasePay" value={filters.minBasePay} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="50000">$50,000</option>
                        <option value="60000">$60,000</option>
                        <option value="70000">$70,000</option>
                    </select>
                </label>
            </div>

            <div className="filter-item">
                <button type="submit">Apply Filters</button>
            </div>
        </form>
    );
};

export default Filters;
