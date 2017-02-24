public class helloBadge {
    @AuraEnabled
    public static Boolean determineIfOwned(String recordId){
        String userId = UserInfo.getUserId();
        Account currentAccount = [SELECT Id, OwnerId FROM Account WHERE Id =: recordId];

        return userId == currentAccount.OwnerId;
    }
}