"use client";

import React, { useState } from "react";

import Certificateframe from "./Certificate-frame";
import CertificateAdd from "./Certificate-add";
import CertificateView from "./Certificate-View";
import CertificateEdit from "./Certificate-edit";
import { Certificate } from "@/lib/type";

export default function Main() {
  const [currentFrame, setCurrentFrame] = useState<
    "table" | "add" | "edit" | "view" | "delete"
  >("table");

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  // Add
  const handleCertificateAdd = () => {
    setCurrentFrame("add");
  };

  // View
  const handleCertificateView = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setCurrentFrame("view");
  };

  // Edit
  const handleCertificateEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setCurrentFrame("edit");
  };

  // Back
  const handleBack = () => {
    setCurrentFrame("table");
    setSelectedCertificate(null);
  };

  const renderCurrentFrame = () => {
    switch (currentFrame) {
      case "add":
        return <CertificateAdd onBack={handleBack} />;

      case "view":
        return selectedCertificate ? (
          <CertificateView
            certificate={selectedCertificate}
            onBack={handleBack}
          />
        ) : (
          <div className="p-6 text-red-500">No certificate selected</div>
        );

      case "edit":
        return selectedCertificate ? (
          <CertificateEdit
            certificate={selectedCertificate}
            onBack={handleBack}
          />
        ) : (
          <div className="p-6 text-red-500">No certificate selected</div>
        );

      default:
        return (
          <Certificateframe
            onAddCertificate={handleCertificateAdd}
            onViewCertificate={handleCertificateView}
            onEditCertificate={handleCertificateEdit}
          />
        );
    }
  };

  return <div>{renderCurrentFrame()}</div>;
}
