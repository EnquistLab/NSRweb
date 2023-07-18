export const formatResponse = (data) => {
  /*
   * data is in the format of:
   * [
   *   id: []
   *   <num_+0>: []
   *   <num_+1>: []
   * ]
   *
   * where `num` is the sequencial number defined by NSR
   * `id` is the header
   *
   */

  // save header for later
  let header = data['id']

  // remove header from main structure
  delete data.id

  // create objects with the header and data
  // [{header:data, ...}]
  let result = Object.keys(data).map((recordIndex) => {
    var tmp = new Object();
    header.map((headerIndex, headerK) => {
      tmp[headerIndex] = data[recordIndex][headerK]
    })
    return tmp
  })

  return result
}
