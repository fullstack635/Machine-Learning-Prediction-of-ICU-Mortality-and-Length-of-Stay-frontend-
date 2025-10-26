import React, { useState } from 'react'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

export default function App() {
  console.log('App component is rendering!')
  
  const [activeTab, setActiveTab] = useState('primary')
  
  // Test backend connection on component mount
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        const healthUrl = `${API_URL}/health`
        console.log('Testing backend connection:', healthUrl)
        const response = await fetch(healthUrl)
        if (response.ok) {
          const data = await response.json()
          console.log('Backend health check:', data)
        } else {
          console.error('Backend health check failed:', response.status)
        }
      } catch (error) {
        console.error('Backend connection error:', error)
      }
    }
    testConnection()
  }, [])
  
  // Generate 57 features (50 numerical + 7 categorical) arranged in 7x8 grid = 56 (with 1 empty)
  const generateRandomFeatures = () => {
    const featureNames = [
      // Row 1 (8 features)
      'gender', 'race', 'language', 'marital_status', 'insurance', 'admission_type', 'admission_location', 'age_at_admission',
      // Row 2 (8 features)
      'rrt_first24h', 'norepinephrine_0_24h', 'epinephrine_0_24h', 'phenylephrine_0_24h', 'vasopressin_0_24h', 'dopamine_0_24h', 'dobutamine_0_24h', 'angiotensinII_0_24h',
      // Row 3 (8 features)
      'milrinone_0_24h', 'any_vaso_inotrope_0_24h', 'mbp_min', 'spo2_min', 'heart_rate_max', 'resp_rate_max', 'temperature_min', 'temperature_max',
      // Row 4 (8 features)
      'vs_glucose_min', 'vs_glucose_max', 'hemoglobin_min', 'platelets_min', 'wbc_max', 'albumin_min', 'aniongap_max', 'bicarbonate_min',
      // Row 5 (8 features)
      'bun_max', 'creatinine_max', 'lab_glucose_min', 'lab_glucose_max', 'sodium_min', 'sodium_max', 'potassium_min', 'potassium_max',
      // Row 6 (8 features)
      'chloride_min', 'calcium_min', 'urine_output_24h', 'heparin_0_24h', 'metoprolol_tartrate_0_24h', 'metoprolol_succinate_xl_0_24h', 'aspirin_0_24h', 'warfarin_0_24h',
      // Row 7 (8 features)
      'amiodarone_0_24h', 'diltiazem_0_24h', 'digoxin_0_24h', 'esmolol_0_24h', 'labetalol_0_24h', 'propranolol_0_24h'
    ]
    
    const features = {}
    featureNames.forEach(name => {
      // Generate random values based on accurate medical ranges
      // Categorical features (text values)
      if (name === 'gender') {
        const genders = ['M', 'F']
        features[name] = genders[Math.floor(Math.random() * genders.length)]
      } else if (name === 'race') {
        const races = ['WHITE', 'BLACK', 'HISPANIC', 'ASIAN', 'OTHER']
        features[name] = races[Math.floor(Math.random() * races.length)]
      } else if (name === 'language') {
        const languages = ['ENGLISH', 'SPANISH', 'CHINESE', 'OTHER']
        features[name] = languages[Math.floor(Math.random() * languages.length)]
      } else if (name === 'marital_status') {
        const statuses = ['MARRIED', 'SINGLE', 'DIVORCED', 'WIDOWED']
        features[name] = statuses[Math.floor(Math.random() * statuses.length)]
      } else if (name === 'insurance') {
        const insurances = ['MEDICARE', 'MEDICAID', 'PRIVATE', 'SELF PAY']
        features[name] = insurances[Math.floor(Math.random() * insurances.length)]
      } else if (name === 'admission_type') {
        const types = ['EMERGENCY', 'ELECTIVE', 'URGENT']
        features[name] = types[Math.floor(Math.random() * types.length)]
      } else if (name === 'admission_location') {
        const locations = ['EMERGENCY ROOM', 'CLINIC', 'TRANSFER', 'PHYSICIAN REFERRAL']
        features[name] = locations[Math.floor(Math.random() * locations.length)]
      } else if (name === 'age_at_admission') {
        features[name] = Math.floor(Math.random() * 80) + 18 // 18-98 years
      } else if (name === 'rrt_first24h' || name === 'any_vaso_inotrope_0_24h' || 
                 name.includes('heparin') || name.includes('metoprolol') || name.includes('aspirin') || 
                 name.includes('warfarin') || name.includes('amiodarone') || name.includes('diltiazem') || 
                 name.includes('digoxin') || name.includes('esmolol') || name.includes('labetalol') || 
                 name.includes('propranolol')) {
        features[name] = Math.floor(Math.random() * 2) // 0 or 1 (binary)
      } else if (name.includes('norepinephrine') || name.includes('epinephrine') || name.includes('phenylephrine') || 
                 name.includes('vasopressin') || name.includes('dopamine') || name.includes('dobutamine') || 
                 name.includes('angiotensin') || name.includes('milrinone')) {
        features[name] = Math.floor(Math.random() * 11) // 0-10 for vasopressors
      } else if (name === 'mbp_min') {
        features[name] = Math.floor(Math.random() * 40) + 40 // 40-80 mmHg
      } else if (name === 'spo2_min') {
        features[name] = Math.floor(Math.random() * 20) + 80 // 80-100%
      } else if (name === 'heart_rate_max') {
        features[name] = Math.floor(Math.random() * 100) + 60 // 60-160 bpm
      } else if (name === 'resp_rate_max') {
        features[name] = Math.floor(Math.random() * 30) + 10 // 10-40 breaths/min
      } else if (name === 'temperature_min') {
        features[name] = Math.round((Math.random() * 5 + 35) * 10) / 10 // 35.0-40.0°C
      } else if (name === 'temperature_max') {
        features[name] = Math.round((Math.random() * 5 + 35) * 10) / 10 // 35.0-40.0°C
      } else if (name.includes('glucose')) {
        features[name] = Math.floor(Math.random() * 300) + 70 // 70-370 mg/dL
      } else if (name === 'hemoglobin_min') {
        features[name] = Math.round((Math.random() * 8 + 6) * 10) / 10 // 6.0-14.0 g/dL
      } else if (name === 'platelets_min') {
        features[name] = Math.floor(Math.random() * 300) + 100 // 100-400 K/μL
      } else if (name === 'wbc_max') {
        features[name] = Math.round((Math.random() * 15 + 4) * 10) / 10 // 4.0-19.0 K/μL
      } else if (name === 'albumin_min') {
        features[name] = Math.round((Math.random() * 2 + 2) * 10) / 10 // 2.0-4.0 g/dL
      } else if (name === 'aniongap_max') {
        features[name] = Math.floor(Math.random() * 15) + 8 // 8-23 mEq/L
      } else if (name === 'bicarbonate_min') {
        features[name] = Math.floor(Math.random() * 10) + 18 // 18-28 mEq/L
      } else if (name === 'bun_max') {
        features[name] = Math.floor(Math.random() * 40) + 7 // 7-47 mg/dL
      } else if (name === 'creatinine_max') {
        features[name] = Math.round((Math.random() * 3 + 0.5) * 10) / 10 // 0.5-3.5 mg/dL
      } else if (name === 'sodium_min') {
        features[name] = Math.floor(Math.random() * 20) + 130 // 130-150 mEq/L
      } else if (name === 'sodium_max') {
        features[name] = Math.floor(Math.random() * 20) + 130 // 130-150 mEq/L
      } else if (name === 'potassium_min') {
        features[name] = Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0 mEq/L
      } else if (name === 'potassium_max') {
        features[name] = Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0 mEq/L
      } else if (name === 'chloride_min') {
        features[name] = Math.floor(Math.random() * 20) + 95 // 95-115 mEq/L
      } else if (name === 'calcium_min') {
        features[name] = Math.round((Math.random() * 2 + 8) * 10) / 10 // 8.0-10.0 mg/dL
      } else if (name === 'urine_output_24h') {
        features[name] = Math.floor(Math.random() * 2000) + 500 // 500-2500 mL
      } else {
        features[name] = Math.floor(Math.random() * 10) // Default 0-9
      }
    })
    return features
  }
  
  const [features, setFeatures] = useState(generateRandomFeatures())
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFeatureChange = (key, value) => {
    setFeatures(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }))
  }

  const generateNewRandomValues = () => {
    setFeatures(generateRandomFeatures())
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const endpoint = activeTab === 'primary' ? '/predict' : '/predict-los'
      const fullUrl = `${API_URL}${endpoint}`
      console.log('Making request to:', fullUrl)
      console.log('API_URL:', API_URL)
      console.log('Endpoint:', endpoint)
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 Model Tester</h1>
        <p>Test your machine learning models with 57 features (7 categorical + 50 numerical)</p>
      </header>

      <main className="main">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'primary' ? 'active' : ''}`}
              onClick={() => setActiveTab('primary')}
            >
              ICU Mortality 
            </button>
            <button 
              className={`tab ${activeTab === 'los' ? 'active' : ''}`}
              onClick={() => setActiveTab('los')}
            >
              LOS Model
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-section">
              <h2>Input Features - {activeTab === 'primary' ? 'ICU Mortality' : 'LOS Model'}</h2>
              <div className="features-grid">
                {Object.entries(features).map(([key, value]) => {
                  const isText = ['gender', 'race', 'language', 'marital_status', 'insurance', 'admission_type', 'admission_location'].includes(key)
                  const unitMap = {
                    'age_at_admission': 'years',
                    'mbp_min': 'mmHg',
                    'spo2_min': '%',
                    'heart_rate_max': 'bpm',
                    'resp_rate_max': 'breaths/min',
                    'temperature_min': '°C',
                    'temperature_max': '°C',
                    'vs_glucose_min': 'mg/dL',
                    'vs_glucose_max': 'mg/dL',
                    'hemoglobin_min': 'g/dL',
                    'platelets_min': 'K/μL',
                    'wbc_max': 'K/μL',
                    'albumin_min': 'g/dL',
                    'aniongap_max': 'mEq/L',
                    'bicarbonate_min': 'mEq/L',
                    'bun_max': 'mg/dL',
                    'creatinine_max': 'mg/dL',
                    'lab_glucose_min': 'mg/dL',
                    'lab_glucose_max': 'mg/dL',
                    'sodium_min': 'mEq/L',
                    'sodium_max': 'mEq/L',
                    'potassium_min': 'mEq/L',
                    'potassium_max': 'mEq/L',
                    'chloride_min': 'mEq/L',
                    'calcium_min': 'mg/dL',
                    'urine_output_24h': 'mL',
                    'rrt_first24h': 'binary',
                    'any_vaso_inotrope_0_24h': 'binary',
                    'heparin_0_24h': 'binary',
                    'metoprolol_tartrate_0_24h': 'binary',
                    'metoprolol_succinate_xl_0_24h': 'binary',
                    'aspirin_0_24h': 'binary',
                    'warfarin_0_24h': 'binary',
                    'amiodarone_0_24h': 'binary',
                    'diltiazem_0_24h': 'binary',
                    'digoxin_0_24h': 'binary',
                    'esmolol_0_24h': 'binary',
                    'labetalol_0_24h': 'binary',
                    'propranolol_0_24h': 'binary',
                    'norepinephrine_0_24h': 'mcg/kg/min',
                    'epinephrine_0_24h': 'mcg/kg/min',
                    'phenylephrine_0_24h': 'mcg/kg/min',
                    'vasopressin_0_24h': 'units/hr',
                    'dopamine_0_24h': 'mcg/kg/min',
                    'dobutamine_0_24h': 'mcg/kg/min',
                    'angiotensinII_0_24h': 'ng/kg/min',
                    'milrinone_0_24h': 'mcg/kg/min'
                  }
                  const unit = unitMap[key] || ''
                  return (
                    <div key={key} className="feature-input">
                      <label htmlFor={key} title={key}>
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} {unit && `(${unit})`}
                      </label>
                      <div className="input-group">
                        <input
                          id={key}
                          type={isText ? "text" : "number"}
                          step={isText ? undefined : "any"}
                          value={value}
                          onChange={(e) => handleFeatureChange(key, e.target.value)}
                          placeholder={isText ? "Enter text" : "Enter value"}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={generateNewRandomValues}
                className="add-feature-btn"
              >
                🎲 Generate New Random Values
              </button>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Predicting...' : 'Run Prediction'}
              </button>
            </div>
          </form>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Processing your prediction...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <h3>❌ Error</h3>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="result">
              <h3>🎯 Prediction Result</h3>
              <div className="result-content">
                <div className="prediction">
                  <span className="label">Prediction:</span>
                  <span className="value">{result.prediction}</span>
                </div>
                {result.confidence && (
                  <div className="confidence">
                    <span className="label">Confidence:</span>
                    <span className="value">{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                )}
                {result.model_info && (
                  <div className="model-info">
                    <span className="label">Model Type:</span>
                    <span className="value">{result.model_info.type}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Built with React + FastAPI</p>
      </footer>
    </div>
  )
}
