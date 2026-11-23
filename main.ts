f=require('fs');T='0Aq46:;?        999999959995999 999             PTTP0           58              4414'
H={0:_=>0,
1:_=>{D[s++]=P[p-1]<<24>>24},
2:_=>{D[s++]=P.readInt32LE(p-4)},
3:_=>{s--},
4:_=>{D[s++]=x},
5:_=>{D[s-1]=y;D[s-2]=x},
6:_=>{D[s++]=y},
7:_=>{D[s-1]=D[s-3];D[s-3]=y;D[s-2]=x},
23:_=>{D[s-1]=-x},
27:_=>{D[s-1]=~x},
48:J=_=>{if(c<49||!D[--s]==c<50)p+=P.readInt16LE(p-2)},49:J,50:J,
51:_=>{if(C[63])return 7;C.push(p);p=P.readUInt16LE(p-2)},
52:_=>{if(!C.length)return 8;p=C.pop()},
64:L=_=>{if(v>255)return 6;c>64?(M[x]=y,s-=2):D[s-1]=M[x]},65:L,
80:Q=_=>{z=c>80?[x&255]:Buffer.from(''+x);if(o.length+z.length>65536)return 11;s--;o.push(...z)},81:Q,
82:_=>{D[s++]=i<X.length?X[i++]:-1},
83:_=>x&255}
B=_=>{if(c>18&c<23&!x)return 4
D[s-2]=[y+x,y-x,Math.imul(y,x),y/x,y%x,u/v,u%v,,y&x,y|x,y^x,,y<<w,y>>w,y>>>w,,y==x,y<x,u<v][c-16];s--}
R=_=>{M=(D=new Int32Array(256)).slice();C=[];s=p=t=i=0
for(;;){if(++t>1e6)return 10;if(!(p>=0&p<P.length))return 9;c=P[p];q=T.charCodeAt(c)-48
if(!(q>=0))return 5;m=q>>4;if(p+m>=P.length)return 9;a=q>>2&3;if(s<a)return 2;if(s-a+q%4>256)return 3
p+=m+1;x=D[s-1];y=D[s-2];u=y>>>0;v=x>>>0;w=x&31;e=(H[c]||B)();if(e+1)return e}}
r=n=>{try{return f.readFileSync(d+n)}catch{return[]}}
for(id of f.readdirSync('/input'))try{d='/input/'+id+'/';P=r('program.bin');X=r('input.bin');o=[]
e=R();f.mkdirSync(d='/output/'+id,{recursive:!0});f.writeFileSync(d+'/stdout.bin',Buffer.from(o));f.writeFileSync(d+'/exit.txt',''+e)}catch{}
