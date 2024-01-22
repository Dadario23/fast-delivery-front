import React from 'react'
import Image from 'next/image'
import styles from './PackagesSelection.module.css'

interface Package {
  title: string
}

const packages: Package[] = [
  {
    title: 'Paquete 1'
  },
  {
    title: 'Paquete 2',
  },
  {
    title: 'Paquete 3',
  },
  {
    title: 'Paquete 4',
  },
  {
    title: 'Paquete 5',
  },
  {
    title: 'Paquete 6',
  },
  {
    title: 'Paquete 7',
  },
]
const PackagesSelection = () => {
  return (
    <div className={styles.background}>
      <div className={styles.TopContainer}>
        <h1 className={styles.headerText3}>Obtener paquetes</h1>
      </div>
      <div className="container mx-auto">
        <div className={styles.container}>
        <h1 className={styles.headerText2}>¿Cuantos paquetes repartiras hoy?</h1>
        <hr className={styles.lineHorizontal} />
          {packages.map((packageItem, index) => (
            <div className={styles.packageCard} key={index}>
              <div className={styles.packageTitle}>{packageItem.title}</div>
              </div>
          ))}
        </div>
        <button className={styles.centerBtn} >Iniciar jornada</button>
      </div>
    </div>
  )
}

export default PackagesSelection


// import React from 'react';
// import Image from 'next/image';
// import styles from './PackagesSelection.module.css';

// interface Package {
//   title: string;
// }

// const packages: Package[] = [
//   {
//     title: 'Paquete 1, alcorta 1200'
//   },
//   {
//     title: 'Paquete 2',
//   },
//   {
//     title: 'Paquete 3',
//   },
//   {
//     title: 'Paquete 4',
//   },
//   {
//     title: 'Paquete 5',
//   },
//   {
//     title: 'Paquete 6',
//   },
//   {
//     title: 'Paquete 7',
//   },
// ];

// const PackagesSelection = () => {
//   return (
//     <div className={styles.background}>
//       <div className={styles.TopContainer}>
//         <h1 className={styles.headerText3}>Obtener paquetes</h1>
//       </div>
//       <div className="container mx-auto">
//         <div className={styles.container}>
//           <h1 className={styles.headerText2}>¿Cuantos paquetes repartirás hoy?</h1>
//           <hr className={styles.lineHorizontal} />
//           {packages.map((packageItem, index) => (
//             <div className={styles.packageCard} key={index}>
//               <div className={styles.packageTitle}>
//                 {packageItem.title.split(',').map((line, i) => (
//                   <div key={i}>{line}</div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className={styles.centerBtn}>Iniciar jornada</button>
//         <div className="verticalLine"></div>
//       </div>
//     </div>
//   );
// };

// export default PackagesSelection;



 