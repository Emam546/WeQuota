import { motion } from 'motion/react'
import { User, Phone, MapPin, IdCard } from 'lucide-react'
import { CustomerResponse } from '../../types'

interface UserInfoProps {
  customerData: CustomerResponse
}

export default function UserInfo({ customerData }: UserInfoProps) {
  const {
    individualInfo,
    certificationInfo,
    contactPersonList,
    addressInfoList,
    custId,
    custCode
  } = customerData.body

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200 font-sans">
      <div className="bg-linear-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User size={20} className="sm:size-24 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm sm:text-lg">Customer Information</h2>
            <p className="text-blue-100 text-[10px] sm:text-xs">
              Personal details and contact info
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Desktop: Side-by-side layout for Personal and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <User size={14} className="sm:size-16 text-blue-600" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Full Name
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">
                  {individualInfo.firstName} {individualInfo.lastName}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Customer ID
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">{custId}</div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Customer Code
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">{custCode}</div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Birthday
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">
                  {formatDate(individualInfo.birthday)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Phone size={14} className="sm:size-16 text-blue-600" />
              Contact Information
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {contactPersonList.map((contact, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-3 sm:p-4">
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Office Phone
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {contact.officePhone}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop: Side-by-side layout for Address and Certification */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Address Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <MapPin size={14} className="sm:size-16 text-blue-600" />
              Address Information
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {addressInfoList.map((address, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-3 sm:p-4">
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Address
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {address.addr4}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 mt-1">
                    Address ID: {address.addrId}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certification Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <IdCard size={14} className="sm:size-16 text-blue-600" />
              Certification Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Certificate ID
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">
                  {certificationInfo.certficateId}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  ID Number
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">
                  {certificationInfo.certId}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
