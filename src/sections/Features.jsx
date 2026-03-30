import { Upload, MessageSquare, Users, BarChart3, Tag, Shield } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Video uploads',
    description:
      'Drag-and-drop uploads up to 5 GB. Large files are chunked and uploaded in parallel for speed and reliability.',
  },
  {
    icon: MessageSquare,
    title: 'Timestamped notes',
    description:
      'Annotate exact moments in training footage. Instructors leave coaching cues, students flag questions for their next lesson.',
  },
  {
    icon: Users,
    title: 'Multi-role access',
    description:
      'Admins manage the school. Instructors create content. Students review their private sessions and shared classes.',
  },
  {
    icon: BarChart3,
    title: 'Progress tracking',
    description:
      'See who has reviewed their footage, where they left off, and which sessions are still unwatched.',
  },
  {
    icon: Tag,
    title: 'Tags and filtering',
    description:
      'Organize sessions by technique, format, or level. Find any training footage in seconds.',
  },
  {
    icon: Shield,
    title: 'Private and secure',
    description:
      'Each school is fully isolated. Videos use temporary URLs that expire. All data encrypted in transit.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything your school needs</h2>
          <p className="section-subtitle">
            From video upload to student progress tracking - built specifically for
            martial arts instruction.
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
