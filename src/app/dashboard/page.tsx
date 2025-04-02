"use client"
import React, { useEffect, useMemo, useState } from "react"
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

ModuleRegistry.registerModules([AllCommunityModule])

interface Car {
  make: string
  model: string
  price: number
  electric: boolean
}

const Dashboard = () => {
  const [rowData, setRowData] = useState<Car[]>([
    { make: "Tesla", model: "Model Y", price: 100, electric: true },
    { make: "Honda", model: "Model Z", price: 200, electric: false },
  ])
  const colDefs: ColDef[] = useMemo(
    () => [
      { field: "make" },
      { field: "model" },
      { field: "price", filter: "agNumberColumnFilter" },
      { field: "electric" },
    ],
    []
  )

  useEffect(() => {
    const largeDataSet: Car[] = Array.from({ length: 100000}, (_, i) => ({
        make: ['Tesla', 'Honda', 'Toyota', 'Ford'][i%4],
        model: `Model ${i + 1}`,
        price: Math.floor(Math.random()*100000),
        electric: i % 2 === 0
    }))
    setRowData(largeDataSet)
  }, [])

  return (
    <>
      <div className="p-2 border border-1 mb-2 text-center">
        <h1>A-Shipment Dashboard</h1>
      </div>

      <div className="h-100 border border-1 ag-theme-alpine">
        <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={{flex: 1}}/>
      </div>
    </>
  )
}

export default Dashboard
