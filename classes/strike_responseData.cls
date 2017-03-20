public with sharing class strike_responseData {
    public Boolean isSuccess;
    public Map<String, Object> results;
    public String errMsg;

    public strike_responseData() {
        this.isSuccess = true;
        this.results = new Map<String, Object>();
    }

    public void addError(String errMsg){
        this.errMsg = errMsg;
        this.isSuccess = false;
    }

    public String getJsonString() {
        return strike_utilities.serializeWithoutNamespace(this);
    }
}