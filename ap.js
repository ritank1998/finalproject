const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;
form.addEventListener('submit',(e)=> {
e.preventDefault();
if(upd){
    clearTimeout(upd);
}
const ctype = form.elements.coinType.value;
fetchPrice(ctype);
});
const fetchPrice = async(ctype)=>{
//async checks thats we are not breaking the promise thread in the java scrip
const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
console.log(r.data.coin.price);
const price= r.data.coin.price;

const volume =  r.data.coin.volume;
const change = r.data.coin.priceChange1d;
const base = r.data.coin.name;
const target = 'USD';

res.innerHTML =`<tr style="background-color:blue; color:white; font-weight:700">
<td>
    Property
</td>
<td>Value</td>
</tr>
<tr>
<td>
    ${base}
</td>
<td>${price} ${target}</td>
</tr>
<tr>
<td>
    Volume
</td>
<td>${volume}</td>
</tr>
<tr>
<td>
    Change
</td>
<td>${change}</td>
</tr>`

upd = setTimeout(()=>fetchPrice(ctype),10000);

}