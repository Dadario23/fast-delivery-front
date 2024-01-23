import React from 'react'
import styles from './PackagesSelection.module.css'
import BackIcon from 'assets/BackIcon/back-icon'

interface Package {
  title: string
}

const packages: Package[] = [
  {
    title: 'Amenabar 2100, CABA'
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
        <div className={styles.backIcon}><BackIcon /></div>
      </div>
        <div className={styles.container}>
        <h1 className={styles.headerText2}>¿Cuántos paquetes repartirás hoy?</h1>
        <hr className={styles.lineHorizontal} />
          {packages.map((packageItem, index) => (
            <div className={styles.packageCard} key={index}>
              <div className={styles.checkbox}></div>
              <div className={styles.packageTitle}>{packageItem.title}</div>
              </div>
          ))}
        </div>
        <button className={styles.centerBtn} >Iniciar jornada</button>
    </div>
  )
}

export default PackagesSelection





// import React from 'react'
// import styles from './PackagesSelection.module.css'
// import BackIcon from 'assets/BackIcon/back-icon'

// interface Package {
//   title: string
// }

// const packages: Package[] = [
//   {
//     title: 'Paquete 1'
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
// ]
// const PackagesSelection = () => {
//   return (
//     <div className={styles.background}>
//       <div className={styles.TopContainer}>
//         <h1 className={styles.headerText3}>Obtener paquetes</h1>
//         <div className={styles.backIcon}><BackIcon /></div>
//       </div>
//       <div className="container mx-auto">
//         <div className={styles.container}>
//           <h1 className={styles.headerText2}>¿Cuántos paquetes repartirás hoy?</h1>
//           <hr className={styles.lineHorizontal} />
//           {packages.map((packageItem, index) => (
//             <div className={styles.packageCard} key={index}>
//               <div className={styles.packageTitle}>
//                 <input type="checkbox" id={`package-checkbox-${index}`} />
//                 <label htmlFor={`package-checkbox-${index}`}>{packageItem.title}</label>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className={styles.centerBtn} >Iniciar jornada</button>
//       </div>
//     </div>
//   )
// }

// export default PackagesSelection