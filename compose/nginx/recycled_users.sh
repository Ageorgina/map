#!/bin/bash
USERS=(COA008PAN COA009PAN COA010PAN COA015PRI COA014MOC)
PASSWD=(qwFKfeQ4xfQqrQ== Mc8mARRfGu8BIA== 3Z6zvdAc3tGbgQ== MM0pUIYkix2UMA== 9dxo0OV2ifQiTA==)
echo "" > .passwd
ITER=0
for user in "${USERS[@]}"
do
  echo ${PASSWD[$ITER]}
  echo $user  
  echo "$(echo -n "$user-${PASSWD[$ITER]}" | base64 )"
  echo "$user=$PASSWD" >> .passwd
  sudo htpasswd -bBC5 .htpasswd $user ${PASSWD[$ITER]}
  echo "{\"d\":\"$(echo -n "$user-${PASSWD[$ITER]}" | base64)\"}" > ../../src/data/auth/$(echo -n "$user-${PASSWD[$ITER]}" | base64).txt
  ITER=${ITER}+1
done

