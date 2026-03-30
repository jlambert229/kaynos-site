export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Record your training",
      description:
        "Film your sessions on any device. Phone, GoPro, or gym camera \u2014 MP4, MOV, and more.",
    },
    {
      number: 2,
      title: "Upload and annotate",
      description:
        "Drag and drop your video. Add timestamped notes at key moments. Tag by technique or format.",
    },
    {
      number: 3,
      title: "Students review on their time",
      description:
        "Students watch, add their own notes, and track their progress \u2014 all from their browser.",
    },
  ];

  return (
    <section id="how-it-works" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Up and running in minutes</h2>
          <p className="section-subtitle">
            No complex setup. No app to install. Just upload, annotate, and
            share with your students.
          </p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div key={step.number} className="step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
