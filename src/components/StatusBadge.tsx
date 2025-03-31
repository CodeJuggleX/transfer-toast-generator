
import React from "react";

type StatusBadgeProps = {
  status: "success" | "pending" | "failed";
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "success":
        return "Успешно";
      case "pending":
        return "В обработке";
      case "failed":
        return "Ошибка";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className={`${getStatusColor()} text-xl`}>
      {getStatusText()}
    </div>
  );
};

export default StatusBadge;
