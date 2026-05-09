"use client";

import { Button } from "@/components/ui/button";
import { ChevronsRightLeftIcon, Plus } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Certificate } from "@/lib/type";
import CertificateTable from "./Certificate-Table";

type CertificateResponse = {
  data: Certificate[];
};

interface CertificateFramesProps {
  onAddCertificate: () => void;
  onEditCertificate: (certificate: Certificate) => void;
  onViewCertificate: (certificate: Certificate) => void;
}

export default function Certificateframe({
  onAddCertificate,
  onEditCertificate,
  onViewCertificate,
}: CertificateFramesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const res = await kyInstance
        .get("certificates")
        .json<CertificateResponse>();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading text="Certificates are Loading" />;
  }

  if (isError) {
    return <Error text="Something is Wrong" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600">
            <ChevronsRightLeftIcon size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Student Certificate
            </h1>
            <p className="text-xs text-slate-400">
              Manage and view student certificate
            </p>
          </div>
        </div>

        <Button
          onClick={onAddCertificate}
          className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </Button>
      </div>

      <CertificateTable
        certificateData={data || []}
        onEditCertificate={onEditCertificate}
        onViewCertificate={onViewCertificate}
      />
    </div>
  );
}
