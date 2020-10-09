#!/bin/bash
USERS=(COA008PAN COA009PAN COA010PAN COA015PRI COA014MOC)
echo "" > .passwd
for user in "${USERS[@]}"
do
  echo $user
  PASSWD=$(openssl rand -base64 10)
  echo "$user=$PASSWD" >> .passwd
  echo $PASSWD | sudo htpasswd -i .htpasswd $user
done
