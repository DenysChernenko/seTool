<script lang="ts">
  let jName:string;
  let jUDL:string;
  let jFilter:string;
  let jFound:boolean;

  interface MyObject {
    Name: string;
    UDL: number;
  }

  export let jdata: MyObject[] = [];
</script>
<div class="w-full p-2">
  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>UDL</th>
      </tr>
    </thead>
    <tbody>
      {#each jdata as obj}
        {#if obj.Name === jFilter}
        <tr>
          <td>{obj.Name}</td>
          <td>{obj.UDL}</td>
        </tr>
        {/if}
      {/each}
      {#if jFilter == undefined || jFilter == ''}
        <tr>
          <td>
            Please enter a Joist Designation
          </td>
          <td></td>
        </tr>
      {/if}

    </tbody>
  </table>
  
  <div class="w-full my-4 flex flex-row flex-wrap">
  <input type="text" placeholder="Joist Designation" class="input input-bordered input-primary flex-1 mr-2 mb-2" bind:value={jFilter}>
  <input type="text" placeholder="Joist UDL" class="input input-bordered input-primary flex-1 mr-2 mb-2" bind:value={jUDL}>
  <button class="btn btn-primary">Add Joist</button>
  </div>

  <div>
    Joist Designation is : {jFilter}
  </div>
</div>

