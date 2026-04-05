export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Film your session",
      description:
        "Use your phone, a GoPro, or whatever camera you have on-site. Any common video format works.",
    },
    {
      number: 2,
      title: "Upload and add notes",
      description:
        "Drop the video into Kaynos and leave notes at the moments that matter. Tag it however you like.",
    },
    {
      number: 3,
      title: "Clients watch and learn",
      description:
        "Your clients log in, watch their footage, and add their own notes. No app to download, just a browser.",
    },
  ];

  return (
    <section id="how-it-works" className="section section--alt">
      <div className="container">
        <div className="section-header" data-reveal>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Three steps. That's it.</h2>
          <p className="section-subtitle">
            No complicated setup. No training manual. If you can upload a
            video to YouTube, you can use Kaynos.
          </p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div key={step.number} className="step" data-reveal style={{ transitionDelay: `${(step.number - 1) * 0.15}s` }}>
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
