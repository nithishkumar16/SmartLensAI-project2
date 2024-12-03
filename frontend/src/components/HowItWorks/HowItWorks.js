import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="container">
      <h1 className="text-center mb-4">How SmartLens AI Works</h1>
      <p className="lead text-center">
        Discover how we use the power of AI and Computer Vision to transform
        your business operations.
      </p>

      {/* Step 1: Data Collection */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6">
          <h3>1. Data Collection</h3>
          <p>
            Our AI system captures high-quality images and videos using
            strategically placed cameras in your business environment. These
            cameras monitor product shelves, customer interactions, and store
            activities in real-time.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://media.istockphoto.com/id/464806966/vector/concepts-for-creative-process-big-data-filter-data-tunnel-analysis.jpg?s=612x612&w=0&k=20&c=Qrd9dKw4_QxVqeFmP8FSOHl9ITP_QQLRQxuFGQXaXfs="
            alt="Data Collection"
            className="img-fluid"
            width="350"
            height="350"
          />
        </div>
      </div>

      {/* Step 2: Image Processing */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 order-lg-1 order-2">
          <img
            src="https://play-lh.googleusercontent.com/hWwd8WeRUqma9_pzJEqVgFVvI8utJPmZ-FqHgbM9yoj77JA8NvUIBPmWgS5LKfrnCQ"
            alt="_Image_ Processing"
            className="img-fluid"
            width="350"
            height="350"
          />
        </div>
        <div className="col-md-6 order-lg-2 order-1">
          <h3>2. Image Processing</h3>
          <p>
            Once the data is captured, our system processes the visual
            information using advanced Computer Vision algorithms. Objects are
            identified and analyzed, with data points extracted for further
            analysis. This step ensures accuracy and precision in identifying
            key metrics.
          </p>
        </div>
      </div>

      {/* Step 3: Machine Learning & Analytics */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6">
          <h3>3. Machine Learning & Analytics</h3>
          <p>
            Our Machine Learning models analyze the data in real-time,
            generating insights and predictions. These models are trained to
            detect patterns in customer behavior, inventory movements, and
            potential security risks, providing you with actionable insights to
            make informed decisions.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://i.pinimg.com/736x/7f/32/67/7f3267e10c433b2d9b79d148d9335a3d.jpg"
            alt="Machine Learning"
            className="img-fluid"
            width="350"
            height="350"
          />
        </div>
      </div>

      {/* Step 4: Real-Time Alerts & Insights */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 order-lg-1 order-2">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*ypTslkGKV3a6CG5u"
            alt="Real-Time Alerts"
            className="img-fluid"
            width="500"
            height="600"
          />
        </div>
        <div className="col-md-6 order-lg-2 order-1">
          <h3>4. Real-Time Alerts & Insights</h3>
          <p>
            Through our intuitive dashboard, business owners can access
            real-time insights on customer behavior, inventory levels, and more.
            Alerts are sent instantly when anomalies or potential risks are
            detected, allowing quick action to avoid disruptions.
          </p>
        </div>
      </div>

      {/* Step 5: Continuous Learning & Optimization */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6">
          <h3>5. Continuous Learning & Optimization</h3>
          <p>
            Our system continuously improves with time, learning from new data
            and optimizing the performance of the AI models. This allows for
            constant improvement in prediction accuracy, ensuring your business
            operations get smarter over time.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://i0.wp.com/spotintelligence.com/wp-content/uploads/2023/10/continual-learning-machine-learning-model.png?fit=960%2C540&ssl=1"
            alt="Optimization"
            className="img-fluid"
            width="500"
            height="500"
          />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
