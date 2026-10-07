import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { activities } from './activities'
import { achievements } from './achievements'
import { events } from './events'
import { galleryItems } from './gallery'
import { notices } from './notices'
import { stats } from './stats'
import { coreTeamMembers, programmeOfficers } from './team'

export type CmsSite = { session?: {id:string;label:string}; sessions: Array<{id:string;label:string;current:boolean}>; collections: Record<string, any[]>; settings: Record<string, any> }
type CmsContextValue = { site: CmsSite | null; reload: () => Promise<void> }
const CmsContext = createContext<CmsContextValue>({site:null,reload:async()=>{}})
function apply(site:CmsSite){
 const c=site.collections||{}
 const replace=(target:any[],source:any[])=>{target.splice(0,target.length,...(source||[]))}
 replace(activities,c.activities||[]);replace(achievements,c.achievements||[]);replace(events,c.events||[]);replace(notices,c.notices||[]);replace(galleryItems,c.gallery||[]);replace(stats,c.stats||[]);replace(coreTeamMembers,(c.team||[]).filter((x:any)=>x.active!==false));replace(programmeOfficers,(c.officers||[]).filter((x:any)=>x.active!==false))
}
export function CmsProvider({children}:{children:ReactNode}){
 const [site,setSite]=useState<CmsSite|null>(null)
 const location=useLocation()
 const latestRequest=useRef(0)
 const reload=useCallback(async()=>{
  const request=++latestRequest.current
  try {
   const response=await fetch('/api/public/site',{cache:'no-store'})
   if(!response.ok)throw new Error('Could not load website content from Supabase')
   const data=await response.json() as CmsSite
   if(request===latestRequest.current){apply(data);setSite(data)}
  } catch(error) {
   if(request===latestRequest.current){apply({collections:{},settings:{},sessions:[]});setSite(null)}
   throw error
  }
 },[])
 useEffect(()=>{
  const refresh=()=>{if(document.visibilityState==='visible')void reload().catch(()=>{})}
  void reload().catch(()=>{})
  window.addEventListener('focus',refresh)
  document.addEventListener('visibilitychange',refresh)
  return()=>{window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh)}
 },[location.pathname,reload])
 const value=useMemo(()=>({site,reload}),[site])
 return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}
export const useCms=()=>useContext(CmsContext)
