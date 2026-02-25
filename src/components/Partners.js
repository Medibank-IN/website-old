"use client"
import React,{useState} from 'react'
const stateData = {
    'Andhra Pradesh': {
      Doctors: [
        { Name: 'Dr. A', Address: 'Address A' },
        { Name: 'Dr. B', Address: 'Address B' },
      ],
      Labs: [
        { Name: 'Lab X', Address: 'Address X' },
        { Name: 'Lab Y', Address: 'Address Y' },
      ],
      Hospitals: [
        { Name: 'Hospital 1', Address: 'Address 1' },
        { Name: 'Hospital 2', Address: 'Address 2' },
      ],
    },
    'Arunachal Pradesh': {
      Doctors: [
        { Name: 'Dr. C', Address: 'Address C' },
        { Name: 'Dr. D', Address: 'Address D' },
      ],
      Labs: [
        { Name: 'Lab Z', Address: 'Address Z' },
        { Name: 'Lab W', Address: 'Address W' },
      ],
      Hospitals: [
        { Name: 'Hospital 3', Address: 'Address 3' },
        { Name: 'Hospital 4', Address: 'Address 4' },
      ],
    },
    'Assam': {
      Doctors: [
        { Name: 'Dr. E', Address: 'Address E' },
        { Name: 'Dr. F', Address: 'Address F' },
      ],
      Labs: [
        { Name: 'Lab V', Address: 'Address V' },
        { Name: 'Lab U', Address: 'Address U' },
      ],
      Hospitals: [
        { Name: 'Hospital 5', Address: 'Address 5' },
        { Name: 'Hospital 6', Address: 'Address 6' },
      ],
    },
    'Bihar': {
      Doctors: [
        { Name: 'Dr. G', Address: 'Address G' },
        { Name: 'Dr. H', Address: 'Address H' },
      ],
      Labs: [
        { Name: 'Lab T', Address: 'Address T' },
        { Name: 'Lab S', Address: 'Address S' },
      ],
      Hospitals: [
        { Name: 'Hospital 7', Address: 'Address 7' },
        { Name: 'Hospital 8', Address: 'Address 8' },
      ],
    },
    'Chhattisgarh': {
      Doctors: [
        { Name: 'Dr. I', Address: 'Address I' },
        { Name: 'Dr. J', Address: 'Address J' },
      ],
      Labs: [
        { Name: 'Lab R', Address: 'Address R' },
        { Name: 'Lab Q', Address: 'Address Q' },
      ],
      Hospitals: [
        { Name: 'Hospital 9', Address: 'Address 9' },
        { Name: 'Hospital 10', Address: 'Address 10' },
      ],
    },
    'Goa': {
      Doctors: [
        { Name: 'Dr. K', Address: 'Address K' },
        { Name: 'Dr. L', Address: 'Address L' },
      ],
      Labs: [
        { Name: 'Lab P', Address: 'Address P' },
        { Name: 'Lab O', Address: 'Address O' },
      ],
      Hospitals: [
        { Name: 'Hospital 11', Address: 'Address 11' },
        { Name: 'Hospital 12', Address: 'Address 12' },
      ],
    },
    'Gujarat': {
      Doctors: [
        { Name: 'Dr. M', Address: 'Address M' },
        { Name: 'Dr. N', Address: 'Address N' },
      ],
      Labs: [
        { Name: 'Lab N', Address: 'Address N' },
        { Name: 'Lab M', Address: 'Address M' },
      ],
      Hospitals: [
        { Name: 'Hospital 13', Address: 'Address 13' },
        { Name: 'Hospital 14', Address: 'Address 14' },
      ],
    },
    'Haryana': {
      Doctors: [
        { Name: 'Dr. O', Address: 'Address O' },
        { Name: 'Dr. P', Address: 'Address P' },
      ],
      Labs: [
        { Name: 'Lab L', Address: 'Address L' },
        { Name: 'Lab K', Address: 'Address K' },
      ],
      Hospitals: [
        { Name: 'Hospital 15', Address: 'Address 15' },
        { Name: 'Hospital 16', Address: 'Address 16' },
      ],
    },
    'Himachal Pradesh': {
      Doctors: [
        { Name: 'Dr. Q', Address: 'Address Q' },
        { Name: 'Dr. R', Address: 'Address R' },
      ],
      Labs: [
        { Name: 'Lab J', Address: 'Address J' },
        { Name: 'Lab I', Address: 'Address I' },
      ],
      Hospitals: [
        { Name: 'Hospital 17', Address: 'Address 17' },
        { Name: 'Hospital 18', Address: 'Address 18' },
      ],
    },
    'Jharkhand': {
      Doctors: [
        { Name: 'Dr. S', Address: 'Address S' },
        { Name: 'Dr. T', Address: 'Address T' },
      ],
      Labs: [
        { Name: 'Lab H', Address: 'Address H' },
        { Name: 'Lab G', Address: 'Address G' },
      ],
      Hospitals: [
        { Name: 'Hospital 19', Address: 'Address 19' },
        { Name: 'Hospital 20', Address: 'Address 20' },
      ],
    },
    'Karnataka': {
      Doctors: [
        { Name: 'Dr. U', Address: 'Address U' },
        { Name: 'Dr. V', Address: 'Address V' },
      ],
      Labs: [
        { Name: 'Lab F', Address: 'Address F' },
        { Name: 'Lab E', Address: 'Address E' },
      ],
      Hospitals: [
        { Name: 'Hospital 21', Address: 'Address 21' },
        { Name: 'Hospital 22', Address: 'Address 22' },
      ],
    },
    'Kerala': {
      Doctors: [
        { Name: 'Dr. W', Address: 'Address W' },
        { Name: 'Dr. X', Address: 'Address X' },
      ],
      Labs: [
        { Name: 'Lab D', Address: 'Address D' },
        { Name: 'Lab C', Address: 'Address C' },
      ],
      Hospitals: [
        { Name: 'Hospital 23', Address: 'Address 23' },
        { Name: 'Hospital 24', Address: 'Address 24' },
      ],
    },
    'Madhya Pradesh': {
      Doctors: [
        { Name: 'Dr. Y', Address: 'Address Y' },
        { Name: 'Dr. Z', Address: 'Address Z' },
      ],
      Labs: [
        { Name: 'Lab B', Address: 'Address B' },
        { Name: 'Lab A', Address: 'Address A' },
      ],
      Hospitals: [
        { Name: 'Hospital 25', Address: 'Address 25' },
        { Name: 'Hospital 26', Address: 'Address 26' },
      ],
    },
    'Maharashtra': {
      Doctors: [
        { Name: 'Dr. AA', Address: 'Address AA' },
        { Name: 'Dr. BB', Address: 'Address BB' },
      ],
      Labs: [
        { Name: 'Lab Y', Address: 'Address Y' },
        { Name: 'Lab X', Address: 'Address X' },
      ],
      Hospitals: [
        { Name: 'Hospital 27', Address: 'Address 27' },
        { Name: 'Hospital 28', Address: 'Address 28' },
      ],
    },
    'Manipur': {
      Doctors: [
        { Name: 'Dr. CC', Address: 'Address CC' },
        { Name: 'Dr. DD', Address: 'Address DD' },
      ],
      Labs: [
        { Name: 'Lab Z', Address: 'Address Z' },
        { Name: 'Lab Y', Address: 'Address Y' },
      ],
      Hospitals: [
        { Name: 'Hospital 29', Address: 'Address 29' },
        { Name: 'Hospital 30', Address: 'Address 30' },
      ],
    },
    'Meghalaya': {
      Doctors: [
        { Name: 'Dr. EE', Address: 'Address EE' },
        { Name: 'Dr. FF', Address: 'Address FF' },
      ],
      Labs: [
        { Name: 'Lab X', Address: 'Address X' },
        { Name: 'Lab W', Address: 'Address W' },
      ],
      Hospitals: [
        { Name: 'Hospital 31', Address: 'Address 31' },
        { Name: 'Hospital 32', Address: 'Address 32' },
      ],
    },
    'Mizoram': {
      Doctors: [
        { Name: 'Dr. GG', Address: 'Address GG' },
        { Name: 'Dr. HH', Address: 'Address HH' },
      ],
      Labs: [
        { Name: 'Lab V', Address: 'Address V' },
        { Name: 'Lab U', Address: 'Address U' },
      ],
      Hospitals: [
        { Name: 'Hospital 33', Address: 'Address 33' },
        { Name: 'Hospital 34', Address: 'Address 34' },
      ],
    },
    'Nagaland': {
      Doctors: [
        { Name: 'Dr. II', Address: 'Address II' },
        { Name: 'Dr. JJ', Address: 'Address JJ' },
      ],
      Labs: [
        { Name: 'Lab T', Address: 'Address T' },
        { Name: 'Lab S', Address: 'Address S' },
      ],
      Hospitals: [
        { Name: 'Hospital 35', Address: 'Address 35' },
        { Name: 'Hospital 36', Address: 'Address 36' },
      ],
    },
    'Odisha': {
      Doctors: [
        { Name: 'Dr. KK', Address: 'Address KK' },
        { Name: 'Dr. LL', Address: 'Address LL' },
      ],
      Labs: [
        { Name: 'Lab R', Address: 'Address R' },
        { Name: 'Lab Q', Address: 'Address Q' },
      ],
      Hospitals: [
        { Name: 'Hospital 37', Address: 'Address 37' },
        { Name: 'Hospital 38', Address: 'Address 38' },
      ],
    },
    'Punjab': {
      Doctors: [
        { Name: 'Dr. MM', Address: 'Address MM' },
        { Name: 'Dr. NN', Address: 'Address NN' },
      ],
      Labs: [
        { Name: 'Lab P', Address: 'Address P' },
        { Name: 'Lab O', Address: 'Address O' },
      ],
      Hospitals: [
        { Name: 'Hospital 39', Address: 'Address 39' },
        { Name: 'Hospital 40', Address: 'Address 40' },
      ],
    },
    'Rajasthan': {
      Doctors: [
        { Name: 'Dr. OO', Address: 'Address OO' },
        { Name: 'Dr. PP', Address: 'Address PP' },
      ],
      Labs: [
        { Name: 'Lab N', Address: 'Address N' },
        { Name: 'Lab M', Address: 'Address M' },
      ],
      Hospitals: [
        { Name: 'Hospital 41', Address: 'Address 41' },
        { Name: 'Hospital 42', Address: 'Address 42' },
      ],
    },
    'Sikkim': {
      Doctors: [
        { Name: 'Dr. QQ', Address: 'Address QQ' },
        { Name: 'Dr. RR', Address: 'Address RR' },
      ],
      Labs: [
        { Name: 'Lab L', Address: 'Address L' },
        { Name: 'Lab K', Address: 'Address K' },
      ],
      Hospitals: [
        { Name: 'Hospital 43', Address: 'Address 43' },
        { Name: 'Hospital 44', Address: 'Address 44' },
      ],
    },
    'Tamil Nadu': {
      Doctors: [
        { Name: 'Dr. SS', Address: 'Address SS' },
        { Name: 'Dr. TT', Address: 'Address TT' },
      ],
      Labs: [
        { Name: 'Lab J', Address: 'Address J' },
        { Name: 'Lab I', Address: 'Address I' },
      ],
      Hospitals: [
        { Name: 'Hospital 45', Address: 'Address 45' },
        { Name: 'Hospital 46', Address: 'Address 46' },
      ],
    },
    'Telangana': {
      Doctors: [
        { Name: 'Dr. UU', Address: 'Address UU' },
        { Name: 'Dr. VV', Address: 'Address VV' },
      ],
      Labs: [
        { Name: 'Lab H', Address: 'Address H' },
        { Name: 'Lab G', Address: 'Address G' },
      ],
      Hospitals: [
        { Name: 'Hospital 47', Address: 'Address 47' },
        { Name: 'Hospital 48', Address: 'Address 48' },
      ],
    },
    'Tripura': {
      Doctors: [
        { Name: 'Dr. WW', Address: 'Address WW' },
        { Name: 'Dr. XX', Address: 'Address XX' },
      ],
      Labs: [
        { Name: 'Lab F', Address: 'Address F' },
        { Name: 'Lab E', Address: 'Address E' },
      ],
      Hospitals: [
        { Name: 'Hospital 49', Address: 'Address 49' },
        { Name: 'Hospital 50', Address: 'Address 50' },
      ],
    },
    'Uttar Pradesh': {
      Doctors: [
        { Name: 'Dr. YY', Address: 'Address YY' },
        { Name: 'Dr. ZZ', Address: 'Address ZZ' },
      ],
      Labs: [
        { Name: 'Lab D', Address: 'Address D' },
        { Name: 'Lab C', Address: 'Address C' },
      ],
      Hospitals: [
        { Name: 'Hospital 51', Address: 'Address 51' },
        { Name: 'Hospital 52', Address: 'Address 52' },
      ],
    },
    'Uttarakhand': {
      Doctors: [
        { Name: 'Dr. AAA', Address: 'Address AAA' },
        { Name: 'Dr. BBB', Address: 'Address BBB' },
      ],
      Labs: [
        { Name: 'Lab B', Address: 'Address B' },
        { Name: 'Lab A', Address: 'Address A' },
      ],
      Hospitals: [
        { Name: 'Hospital 53', Address: 'Address 53' },
        { Name: 'Hospital 54', Address: 'Address 54' },
      ],
    },
    'West Bengal': {
      Doctors: [
        { Name: 'Dr. CCC', Address: 'Address CCC' },
        { Name: 'Dr. DDD', Address: 'Address DDD' },
      ],
      Labs: [
        { Name: 'Lab Z', Address: 'Address Z' },
        { Name: 'Lab Y', Address: 'Address Y' },
      ],
      Hospitals: [
        { Name: 'Hospital 55', Address: 'Address 55' },
        { Name: 'Hospital 56', Address: 'Address 56' },
      ],
    },
    'Andaman and Nicobar Islands': {
      Doctors: [
        { Name: 'Dr. EEE', Address: 'Address EEE' },
        { Name: 'Dr. FFF', Address: 'Address FFF' },
      ],
      Labs: [
        { Name: 'Lab X', Address: 'Address X' },
        { Name: 'Lab W', Address: 'Address W' },
      ],
      Hospitals: [
        { Name: 'Hospital 57', Address: 'Address 57' },
        { Name: 'Hospital 58', Address: 'Address 58' },
      ],
    },
    'Chandigarh': {
      Doctors: [
        { Name: 'Dr. GGG', Address: 'Address GGG' },
        { Name: 'Dr. HHH', Address: 'Address HHH' },
      ],
      Labs: [
        { Name: 'Lab V', Address: 'Address V' },
        { Name: 'Lab U', Address: 'Address U' },
      ],
      Hospitals: [
        { Name: 'Hospital 59', Address: 'Address 59' },
        { Name: 'Hospital 60', Address: 'Address 60' },
      ],
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
      Doctors: [
        { Name: 'Dr. III', Address: 'Address III' },
        { Name: 'Dr. JJJ', Address: 'Address JJJ' },
      ],
      Labs: [
        { Name: 'Lab T', Address: 'Address T' },
        { Name: 'Lab S', Address: 'Address S' },
      ],
      Hospitals: [
        { Name: 'Hospital 61', Address: 'Address 61' },
        { Name: 'Hospital 62', Address: 'Address 62' },
      ],
    },
    'Lakshadweep': {
      Doctors: [
        { Name: 'Dr. KKK', Address: 'Address KKK' },
        { Name: 'Dr. LLL', Address: 'Address LLL' },
      ],
      Labs: [
        { Name: 'Lab R', Address: 'Address R' },
        { Name: 'Lab Q', Address: 'Address Q' },
      ],
      Hospitals: [
        { Name: 'Hospital 63', Address: 'Address 63' },
        { Name: 'Hospital 64', Address: 'Address 64' },
      ],
    },
    'Delhi': {
      Doctors: [
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
        { Name: 'Dr. MMM', Address: 'Address MMM' },
        { Name: 'Dr. NNN', Address: 'Address NNN' },
      ],
      Labs: [
        { Name: 'Lab P', Address: 'Address P' },
        { Name: 'Lab O', Address: 'Address O' },
      ],
      Hospitals: [
        { Name: 'Hospital 65', Address: 'Address 65' },
        { Name: 'Hospital 66', Address: 'Address 66' },
      ],
    },
    'Puducherry': {
      Doctors: [
        { Name: 'Dr. OOO', Address: 'Address OOO' },
        { Name: 'Dr. PPP', Address: 'Address PPP' },
      ],
      Labs: [
        { Name: 'Lab N', Address: 'Address N' },
        { Name: 'Lab M', Address: 'Address M' },
      ],
      Hospitals: [
        { Name: 'Hospital 67', Address: 'Address 67' },
        { Name: 'Hospital 68', Address: 'Address 68' },
      ],
    },
    'Jammu and Kashmir': {
        Doctors: [
          { Name: 'Dr. OOO1', Address: 'Address OOO1' },
          { Name: 'Dr. PPP1', Address: 'Address PPP1' },
        ],
        Labs: [
          { Name: 'Lab Nx', Address: 'Address Nx' },
          { Name: 'Lab Mx', Address: 'Address Mx' },
        ],
        Hospitals: [
          { Name: 'Hospital 67x', Address: 'Address 67x' },
          { Name: 'Hospital 68x', Address: 'Address 68x' },
        ],
      }
    // You can add more states as needed
    
  };
  
export default function Partners(props) {
  const [activeTab, setActiveTab] = useState('Doctors');
  return (
    <div className=''>
    <div className='flex justify-between items-center w-full'>
      <button onClick={() => setActiveTab('Doctors')} className={activeTab=='Doctors'?"text-red-500 md:text-[26px] text-[22px] font-semibold":"text-[#555] md:text-[22px] text-[18px] font-semibold"}>Doctors</button>
      <button onClick={() => setActiveTab('Labs')} className={activeTab=='Labs'?"text-red-500 md:text-[26px] text-[22px] font-semibold":"text-[#555] md:text-[22px] text-[18px] font-semibold"}>Labs</button>
      <button onClick={() => setActiveTab('Hospitals')} className={activeTab=='Hospitals'?"text-red-500 md:text-[26px] text-[22px] font-semibold":"text-[#555] md:text-[22px] text-[18px] font-semibold"}>Hospitals</button>
    </div>


    <div className='h-[500px] overflow-auto'>
    <table className='relative w-full bg-white shadow-[0px_0px_10px_#ccc] rounded-[10px]  m-auto text-center md:my-8 my-4 [&_th]:border-b [&_th]:border-r [&_th]:p-2 [&_td]:border-r'>
        <thead className='rounded-[20px]'>
  <tr className=' bg-[#555] text-[white] rounded-[20px]'>
    <th className='bg-[#555] text-[white] sticky top-0'>Name</th>
    <th className='bg-[#555] text-[white] sticky top-0'>Address</th>
  </tr>
        </thead>
        <tbody className=''>
      {stateData[props.state][activeTab].map((item, index) => (       
  <tr key={index}>
    <td>{item.Name}</td>
    <td>{item.Address}</td>  
  </tr>

      ))}
      </tbody>
      </table>
    </div>
  </div>
  )
}
