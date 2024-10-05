import React from 'react';
import { FileText, Image, File, FileSpreadsheet, Folder } from 'lucide-react';

const iconMap = {
  PDF: FileText,
  Image: Image,
  Word: File,
  Excel: FileSpreadsheet,
  Folder: Folder,
};

const DocumentCard = ({ document }) => {
  const Icon = iconMap[document.type] || FileText;

  return (
    <div className="document-card">
      <Icon size={24} className="document-icon" />
      <div className="document-info">
        <h3 className="document-title">{document.title}</h3>
        <p className="document-type">{document.type}</p>
      </div>
    </div>
  );
};

export default DocumentCard;