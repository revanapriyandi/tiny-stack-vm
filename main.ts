f=require('fs');T='0Aq46:;?        999999959995999 999             PTTP0           58              4414'
R=()=>{D=new Int32Array(257);C=[];M=new Int32Array(256);s=p=t=i=0;n=P.length
for(;;){if(t++>=1e6)return 10;if(p<0|p>=n)return 9;c=P[p];q=T.charCodeAt(c)-48
if(!(q>=0))return 5;m=q>>4;if(p+m>=n)return 9;a=q>>2&3;if(s<a)return 2;if(s-a+(q&3)>256)return 3
p+=m+1;x=D[s-1];y=D[s-2];u=y>>>0;v=x>>>0;w=x&31
switch(c){case 0:return 0
case 1:D[s++]=P[p-1]<<24>>24;break
case 2:D[s++]=P.readInt32LE(p-4);break
case 3:s--;break
case 4:D[s++]=x;break
case 5:D[s-1]=y;D[s-2]=x;break
case 6:D[s++]=y;break
case 7:D[s-1]=D[s-3];D[s-3]=y;D[s-2]=x;break
case 23:D[s-1]=-x;break
case 27:D[s-1]=~x;break
case 48:p+=P.readInt16LE(p-2);break
case 49:case 50:if(!D[--s]==(c<50))p+=P.readInt16LE(p-2);break
case 51:if(C.length>63)return 7;C.push(p);p=P.readUInt16LE(p-2);break
case 52:if(!C.length)return 8;p=C.pop();break
case 64:if(v>255)return 6;D[s-1]=M[x];break
case 65:if(v>255)return 6;M[x]=y;s-=2;break
case 80:if(o.length+(x+'').length>65536)return 11;s--;o.push(...Buffer.from(x+''));break
case 81:if(o.length>65535)return 11;s--;o.push(x&255);break
case 82:D[s++]=i<X.length?X[i++]:-1;break
case 83:return x&255
default:if(c>18&c<23&!x)return 4
D[s-2]=[y+x,y-x,Math.imul(y,x),y/x,y%x,u/v,u%v,,y&x,y|x,y^x,,y<<w,y>>w,y>>>w,,y==x,y<x,u<v][c-16];s--}}}
// anomalies: a missing/unreadable file reads as empty (no program traps 9), one bad instance never stops the rest
r=n=>{try{return f.readFileSync(d+n)}catch{return Buffer.alloc(0)}}
for(id of f.readdirSync('/input').sort())try{d='/input/'+id+'/';P=r('program.bin');X=r('input.bin');o=[]
e=R();f.mkdirSync(d='/output/'+id,{recursive:!0});f.writeFileSync(d+'/stdout.bin',Buffer.from(o));f.writeFileSync(d+'/exit.txt',e+'')}catch{}
