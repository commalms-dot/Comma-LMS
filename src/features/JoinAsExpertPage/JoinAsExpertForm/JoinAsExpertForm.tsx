"use client";

import { useState } from "react";
import styles from "./JoinAsExpertForm.module.css";

const JoinAsExpertForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
    nationality: "",
    graduationYear: "",
    jobTitle: "",
    organization: "",
    discipline: "",
    bio: "",
    topics: "",
    yearsOfTrainingExperience: "",
    linkedinUrl: "",
    facebookUrl: "",
    cv: null as File | null,
    photo: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ message: string; success: boolean } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("linkedinUrl", formData.linkedinUrl);
      formDataToSend.append("facebookUrl", formData.facebookUrl);
      formDataToSend.append("jobTitle", formData.jobTitle);
      formDataToSend.append("yearsOfTrainingExperience", formData.yearsOfTrainingExperience);
      formDataToSend.append("discipline", formData.topics);
      formDataToSend.append("topics", formData.topics);
      formDataToSend.append("nationality", formData.nationality);
      formDataToSend.append("organization", formData.organization);

      // Optional fields
      if (formData.cv) formDataToSend.append("cv", formData.cv);
      if (formData.photo) formDataToSend.append("photo", formData.photo);
      if (formData.email) formDataToSend.append("email", formData.email);
      if (formData.mobile) formDataToSend.append("mobile", formData.mobile);
      if (formData.bio) formDataToSend.append("bio", formData.bio);
      if (formData.graduationYear)
        formDataToSend.append("graduationYear", formData.graduationYear);
      if (formData.gender) formDataToSend.append("gender", formData.gender);

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/instructors/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("❌ Error response:", errText);
        throw new Error("Failed to submit form");
      }

      setModal({
        message: "✅ Your request is under processing. You will receive an email once reviewed.",
        success: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setModal({
        message: "⚠️ Something went wrong. Please try again.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    if (modal?.success) {
      window.location.href = "/";
    } else {
      setModal(null);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Nationality</label>
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Contact Information</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Professional Background</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Job Title</label>
            <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Organization</label>
            <input
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Graduation Year</label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Years of Experience</label>
            <input
              type="number"
              name="yearsOfTrainingExperience"
              value={formData.yearsOfTrainingExperience}
              onChange={handleChange}
              required
              min={0}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>Topics of Expertise</label>
          <input
            name="topics"
            placeholder="e.g., Marketing, AI, Business Strategy"
            value={formData.topics}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about your background and experience"
          />
        </div>

        <h3 className={styles.sectionTitle}>Social Profiles</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>LinkedIn URL</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Facebook URL</label>
            <input
              type="url"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Uploads</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Upload CV</label>
            <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            {formData.cv && <p className={styles.fileInfo}>Selected: {formData.cv.name}</p>}
          </div>

          <div className={styles.field}>
            <label>Upload Personal Photo</label>
            <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
            {formData.photo && (
              <>
                <p className={styles.fileInfo}>Selected: {formData.photo.name}</p>
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className={styles.preview}
                />
              </>
            )}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* ✅ Popup Modal */}
      {modal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{modal.message}</p>
            <button onClick={handleModalClose} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinAsExpertForm;
