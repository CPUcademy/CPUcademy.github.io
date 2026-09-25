import { Link } from 'react-router-dom'
import type { TutorialPage } from '../../content'

type LessonNavButtonsProps = {
  current: TutorialPage
  previous: TutorialPage | null
  next: TutorialPage | null
  topic?: string
  top?: boolean
}

export const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, 0);
};

function LessonNavButtons({ current, previous, next, topic, top }: LessonNavButtonsProps) {
  if (!previous && !next) return null

  const base = `/tutorials/${current.category}${topic ? `/${topic}` : ''}`

  return (
    <div className="d-flex justify-content-between" style={{ marginTop: top ? 0 : '2rem', marginBottom: top ? '1.5rem' : '0.7rem', gap: '0.75rem' }}>
      <div className="lessonNavCell">{previous && ( <Link to={`${base}/${previous.slug}`} className="small-button lessonNavButtons" onClick={scrollToTop}>←&nbsp;<span>{previous.title}</span></Link> )}</div>
      <div className="lessonNavCell">{next && ( <Link to={`${base}/${next.slug}`} className="small-button lessonNavButtons" onClick={scrollToTop}><span>{next.title}</span>&nbsp;→</Link> )}</div>
    </div>
  )
}

export default LessonNavButtons