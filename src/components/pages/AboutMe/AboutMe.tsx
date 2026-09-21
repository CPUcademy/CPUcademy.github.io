import { Link } from 'react-router-dom'
import ToggleDescription from '../../buttons/ToggleDescription'
import '../../../App.css'
import './AboutMe.css'
import { useEffect } from 'react'
import skillCategories from '../../../content/websiteData/skills.json'
import profile from '../../../content/websiteData/profile.json'

type Skill = { icon: string, name: string }
type SkillCategory = { name: string, skills: Skill[] }
const skillCategoriesTyped = skillCategories as SkillCategory[]

type ExperienceEntry = {
  aboutme: string
  dates: string
  position: string
  company: string
  description: string[]
  subDescription?: { intro: string, items: string[] }
}
type EducationEntry = { years: string, school: string, title: string }
type LanguageEntry = { name: string, flag: string }
type Profile = { aboutme: string, experience: ExperienceEntry[], education: EducationEntry[], languages: LanguageEntry[] }
const profileTyped = profile as Profile

function AboutMe() {
  useEffect(() => { document.title = 'About Me' }, [])

  return (
    <>
      <div className="col-lg-8 mb-4 noBottomMargin">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">About Me</h5>
          </div>
          <div className="card-body">
            <div className="foto2" id="profilepic">
              <img src="/icons/main/profile-picture.jpg" className="img-fluid" style={{ minWidth: "100px" }} alt="Profile" />
              <p style={{ display: "block", textAlign: "center", fontSize: "small", marginTop: "5px", fontWeight: "bold", marginBottom: "0px" }}>Tymoteusz Kołodziejczyk</p>
            </div>
            <p className="noBottomMargin">{profileTyped.aboutme}</p>

            <div className="d-flex gap-2 flex-wrap" style={{ marginTop: "10px" }}>
              <Link to="/portfolio-projects" className="small-button" style={{ marginRight: "10px", marginBottom: "10px" }}>Programming Portfolio Projects</Link>
              <Link to="/photo-gallery" className="small-button" style={{ marginBottom: "10px" }}>Photo Gallery</Link>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">Experience</h5>
          </div>
          <div className="card-body">
            {profileTyped.experience.map((entry) => (
              <div className="experience-card noBottomMargin" key={entry.company + entry.dates}>
                <div className="experience-content">
                  <div className="vertically-aligned-container">
                    <div className="experience-dates">{entry.dates}</div>
                    <div>
                      <div className="experience-position">{entry.position}</div>
                      <div className="experience-company">{entry.company}</div>
                    </div>
                  </div>

                  <ToggleDescription>
                    <div className="experience-description">
                      <ul>
                        {entry.description.map((line, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
                        ))}
                        {entry.subDescription && (
                          <li>
                            {entry.subDescription.intro}
                            <ul>
                              {entry.subDescription.items.map((item, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </div>
                  </ToggleDescription>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">Education</h5>
          </div>
          <div className="card-body">
            {profileTyped.education.map((entry) => (
              <div className="education-card noBottomMargin" key={entry.school}>
                <div className="education-years">{entry.years}</div>
                <div className="education-content">
                  <div className="education-school">{entry.school}</div>
                  <div className="education-title">{entry.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-lg-4 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">Technologies &amp; Tools</h5>
          </div>
          <div className="card-body" style={{ paddingTop: "15px" }}>
            {skillCategoriesTyped.map((category, i) => (
              <span key={category.name}>
                {i > 0 && <hr className="sidebar-divider" style={{ marginTop: "10px", marginBottom: "4px", height: "1px", backgroundColor: "lightgray", border: "none" }} />}
                <div className="skills-divider" style={{ marginBottom: "5px" }}>{category.name}</div>
                {category.skills.map((skill) => (
                  <img key={skill.icon + skill.name} src={`/icons/skills/${skill.icon}`} alt={skill.name} title={skill.name} className="social" />
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">Languages</h5>
          </div>
          <div className="card-body" style={{ padding: "12px", paddingTop: "16px", paddingBottom: "7px", display: "flex", flexWrap: "wrap", gap: "28px", justifyContent: "center", marginTop: "0.1rem" }}>
            {profileTyped.languages.map((lang) => (
              <div className="language-item" key={lang.name}>{lang.name}<img src={`/icons/flags/${lang.flag}`} alt="Icon" /></div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutMe